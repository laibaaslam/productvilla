import fetch from 'node-fetch'; // Import fetch from node-fetch
globalThis.fetch = fetch // for ReferenceError: fetch is not defined

import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';

dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN
const hf = new HfInference(HF_TOKEN);
//const data="The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930."
const data = `Welcome back, Javed Latif has declared two former army chiefs and former DGISI as handlers of Almi Quotas. Javed Latif said that to remove Nawaz Sharif, Raheel Sharif, Kamar Bajwa and Faiz Hameed played the role of local handlers of Almi Quotas. DGSI also said that Nawaz Sharif took the names of people sitting in institutions in Gujarat. He is asking level playing field from people sitting in institutions. Javed Latif said that to remove Nawaz Sharif, Raheel Sharif, Kamar Bajwa and Faiz Hameed played the role of local handlers of Almi Quotas.
Sir, please tell me, who were the locals involved in this conspiracy? To remove Nawaz Sharif? From General Raheel to 
General Faiz, General Bajwa, all of them were involved. Yesterday, this was being discussed with Bilawal Bhutto. I said, if Nawaz Sharif has decided to change an army chief, then it is his right. He said, it is his right, but who told him to send the plane to India? No one told him to send it to India, to bring it from India. This is the same thing, that Pakistan's budget is not that much. The translator of the NAB at that time said, that Nawaz Sharif has sent much more money to India's account. It has not been clarified yet. I am asking for a level playing field from all the institutions in Pakistan, which make decisions. I am requesting them, that the people sitting in the institutions, put 
allegations on us.
We took the name in Gujranwala, not the court, but the character of the people sitting in the court, their role was revealed that you are also harming the state in violation of the law. And while harming us, you are harming the state. Even today, if God forbid, a person sitting in any court violates the law, if you talk about the people of the institution, you say it is your right. If you talk about the people sitting in the court, you say it is a threat. So let me tell you again, the leader of the Noon League, Javed Latif, declared the former army chief and former GJISI as the 
handler of the international courts. Javed Latif said that to remove Nawaz Sharif, Raheel Sharif, Kamar Bajwa and Faiz Hamid played the role of the local handler of the international courts. The leader of the League also said that in 
Gujranwala, Nawaz Sharif took the names of the people sitting in the institutions. Let's listen to what he said again.
Tell me about Imran Khan. What did he do for Pakistan? It doesn't matter, sir. This is an irrelevant issue. The relevant issue is where are the local headlines in you? No, no, this is relevant. No, sir, you are going on issues. I listened to you. Mr. Mian had made Pakistan a cheat. That's why this happened. Tell me, who will work for the local people when someone is doing something for Pakistan? Sir, who will work for the local people? Sir, tell me, who will work 
for the local people when someone is doing something for Pakistan? Who were the local people involved in this conspiracy? To remove Nawaz Sharif? Yes, yes. From General Raheel to General Faiz, General Bajwa, they were all involved. Yesterday, this was being discussed with Bilawal Bhutto. I said, if Nawaz Sharif has decided to change an army chief, then it is his right. He said. A question was asked to Javed Lateef. Who are you asking for a level playing field from? Javed Lateef said, the decision-makers...
This is an irrelevant issue. The relevant issue is that who were the local hackers in you? No, no, this is irrelevant. No, sir, sir, you are going on issues. I listened to you. Mr. Mian had made Pakistan into China. That's why this happened. Tell me, who were the local people involved in this? When someone was doing something good for Pakistan. Sir, who were the local people involved? When someone was working on the agenda of Pakistan's powerful forces. Sir, sir, 
tell me this. Who were the local people involved in this conspiracy? Who were the local people involved in this conspiracy? Who were the local people involved in this conspiracy?
`
const result = await hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs: data,
    parameters: {
        min_length: 80
        //max_length
    }
})
console.log(result);