'use client';



import { useState } from 'react';

import { useRouter } from 'next/navigation'; // 画面遷移用の機能



export default function ClaimWalletPage() {

const router = useRouter(); // これを使ってジャンプします


const [soluna, setSoluna] = useState('');

const [phrase, setPhrase] = useState('');

const [turnstile, setTurnstile] = useState('');

const [loading, setLoading] = useState(false);

const [message, setMessage] = useState('');



async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

e.preventDefault();

setLoading(true);

setMessage('');



try {

const res = await fetch('/api/claim-wallet', {

method: 'POST',

body: JSON.stringify({ soluna, phrase, turnstile }),

});



const data = await res.json();



if (!res.ok) {

// エラーのときはメッセージを表示して留まる

setMessage(data.message || 'Error');

} else {

// ★成功時の処理：ここで画面を強制的に切り替えます！

const txHash = data.tx || data.hash || '';


// 成功画面へジャンプ（Go!）

router.push(`/claim/success?amount=${soluna}&tx=${txHash}`);

}

} catch (err) {

setMessage('Request failed.');

} finally {

setLoading(false);

}

}



return (

<main className="min-h-screen bg-black text-white flex items-center justify-center">

<div className="w-full max-w-xl p-8 border border-neutral-700 rounded-xl bg-neutral-900/70">

<h1 className="text-2xl font-bold mb-4">Claim SOLUNA</h1>



<form onSubmit={handleSubmit} className="space-y-4">

<input

type="text"

placeholder="SOLUNA literal"

className="border border-neutral-600 bg-black p-2 w-full rounded text-white"

value={soluna}

onChange={e => setSoluna(e.target.value)}

/>



<input

type="password"

placeholder="Passphrase"

className="border border-neutral-600 bg-black p-2 w-full rounded text-white"

value={phrase}

onChange={e => setPhrase(e.target.value)}

/>



<input

type="text"

placeholder="Turnstile Token"

className="border border-neutral-600 bg-black p-2 w-full rounded text-white"

value={turnstile}

onChange={e => setTurnstile(e.target.value)}

/>



<button

type="submit"

disabled={loading}

className="bg-white text-black font-semibold px-4 py-2 rounded w-full disabled:opacity-60 hover:bg-gray-200 transition-colors"

>

{loading ? 'Processing...' : 'Claim'}

</button>

</form>



{message && (

<p className="mt-4 text-sm text-red-400">

{message}

</p>

)}

</div>

</main>

);

}