"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("เป็นทางการ"); // เพิ่ม State สำหรับโทนเสียง
  const [objective, setObjective] = useState("ให้ความรู้");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      
      const webhookUrl = "https://phenphitcha4848.app.n8n.cloud/webhook/00836624-8dda-4f1b-9ee0-65919576504a";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
          "หัวข้อที่ต้องการเขียน": topic,
          "โทนเสียงของเนื้อหา": tone, 
          "วัตถุประสงค์": objective,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("ระบบขัดข้อง กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          🤖 AI Content Creator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ช่องที่ 1: หัวข้อ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">หัวข้อที่ต้องการเขียน</label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              placeholder="เช่น วิธีทำไข่เจียวหมูสับ, เรื่องผีตลกๆ"
            />
          </div>

          {/* ช่องที่ 2: โทนเสียง (อัปเดตตาม n8n) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">โทนเสียงของเนื้อหา</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            >
              <option value="ทางการ">ทางการ</option>
              <option value="สนุกสนาน">สนุกสนาน</option>
              <option value="น่ารัก">น่ารัก</option>
              <option value="น่ากลัว">น่ากลัว</option>
              <option value="เศร้า">เศร้า</option>
              <option value="ตลก">ตลก</option>
              <option value="โกรธ">โกรธ</option>
              <option value="เป็นกันเอง">เป็นกันเอง</option>
            </select>
          </div>

          {/* ช่องที่ 3: วัตถุประสงค์ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">วัตถุประสงค์</label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            >
              <option value="ให้ความรู้">📚 ให้ความรู้</option>
              <option value="เพื่อความบันเทิง">🎭 เพื่อความบันเทิง</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "กำลังให้ AI คิดเนื้อหา... ⏳" : "สร้างคอนเทนต์ ✨"}
          </button>
        </form>

        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-green-600">✅ ผลลัพธ์จาก AI:</h2>
            
            <div className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-200">
              <h3 className="font-bold text-blue-800">📘 โพสต์ Facebook</h3>
              <p className="whitespace-pre-wrap text-sm mt-2 text-black">{result.results?.facebook}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-bold text-gray-800">🐦 โพสต์ Twitter (X)</h3>
              <p className="whitespace-pre-wrap text-sm mt-2 text-black">{result.results?.X}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}