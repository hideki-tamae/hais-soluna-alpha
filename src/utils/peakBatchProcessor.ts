/**
 * Peak State Discovery Batch Processor
 * 
 * [設計思想: プロアクティブな「天の理」の検知]
 * 週次などで非同期に実行され、全ユーザーの直近90日間の「知行合一」のピークを算出。
 * 現在のステータスが過去のPeak（天の理）に対し閾値以下に下落している場合、
 * 茹でガエル状態とみなし PeakCalibration の proposedSync フラグを立てます。
 * これにより、フロント側で「沈黙の提案(Sync)」を待つ状態を作ります。
 */

import { PrismaClient } from '@prisma/client';
import { findPeakWindow, generateCalibrationProposal, UserDailyRecord } from './peakDiscovery';

const prisma = new PrismaClient();

export async function processPeakCalibrations() {
    console.log('[PeakBatch] Starting Peak Calibration Batch...');
    
    // 過去90日間のデータを評価対象とする
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    // 有効なスキャン履歴を持つ全ユーザーを取得
    const users = await prisma.user.findMany({
        include: {
            scans: {
                where: { createdAt: { gte: ninetyDaysAgo } },
                orderBy: { createdAt: 'asc' }
            },
            careActions: {
                where: { createdAt: { gte: ninetyDaysAgo } },
                orderBy: { createdAt: 'asc' }
            },
            peakCalib: true
        }
    });

    let processedCount = 0;
    let trappedCount = 0;

    for (const user of users) {
        if (user.scans.length === 0) continue;

        // DBデータを UserDailyRecord に変換
        // ※ 簡略化のため、各スキャン日と合致するケアアクションをマッピングします
        const historyData: UserDailyRecord[] = user.scans.map(scan => {
            const startOfDay = new Date(scan.createdAt);
            startOfDay.setHours(0,0,0,0);
            const endOfDay = new Date(scan.createdAt);
            endOfDay.setHours(23,59,59,999);

            const dailyActions = user.careActions.filter(
                a => a.createdAt >= startOfDay && a.createdAt <= endOfDay
            ).map(a => ({
                sessionId: a.id,
                actionType: a.actionType as any,
                impactScore: a.impactScore
            }));

            // モック: omegaScore を擬似的に AnalysisResult 型でラップ
            const mockMetrics: any = { omegaScore: scan.omegaScore };

            return {
                dateId: scan.createdAt.toISOString().split('T')[0],
                voiceMetrics: mockMetrics,
                careActions: dailyActions
            };
        });

        // 核心：真の Peak Window を算出 (知行合一アルゴリズム)
        const peak = findPeakWindow(historyData);
        if (!peak) continue;

        // 現在の3日平均相当（直近3スキャンの平均値で仮算出）
        const recentScans = user.scans.slice(-3);
        const currentAverage = recentScans.reduce((acc, s) => acc + s.omegaScore, 0) / recentScans.length;

        // キャリブレーションの提案判定（天の理と不言実行）
        const proposal = generateCalibrationProposal(currentAverage, peak);

        // データベースへ永続化（PeakCalibrationテーブル）
        await prisma.peakCalibration.upsert({
            where: { userId: user.id },
            update: {
                peakScore: peak.peakScore,
                isTrapped: proposal.shouldPropose,
                proposedSync: proposal.shouldPropose // UIに沈黙のフラグを渡す
            },
            create: {
                userId: user.id,
                peakScore: peak.peakScore,
                isTrapped: proposal.shouldPropose,
                proposedSync: proposal.shouldPropose
            }
        });

        processedCount++;
        if (proposal.shouldPropose) trappedCount++;
    }

    console.log(`[PeakBatch] Finished processing ${processedCount} users. ${trappedCount} users flagged for 'Sync' UI.`);
}
