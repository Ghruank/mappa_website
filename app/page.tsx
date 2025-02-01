'use client';

import { Download, Terminal, Wand2, Clipboard, Check, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import groq from '../assets/groq.png';
import llama from '../assets/meta.png';
import py2 from '../assets/py2.png';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 2000);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const circles: { x: number; y: number; radius: number; dx: number; dy: number; color: string }[] = [];
    const colors = ['#2563eb30', '#7c3aed30', '#db277830'];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 15; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(circle => {
        circle.x += circle.dx;
        circle.y += circle.dy;
        if (circle.x < -circle.radius) circle.x = canvas.width + circle.radius;
        if (circle.x > canvas.width + circle.radius) circle.x = -circle.radius;
        if (circle.y < -circle.radius) circle.y = canvas.height + circle.radius;
        if (circle.y > canvas.height + circle.radius) circle.y = -circle.radius;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  const commands = [
    { cmd: "pip install mappa", label: "Using pip" },
    { cmd: "scoop install mappa", label: "Using Scoop" },
    { cmd: "choco install mappa", label: "Using Chocolatey" },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />

      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
              mappa
            </div>
            <div className="flex gap-8 items-center">
              <a href="#features" className="text-white/70 hover:text-white transition">Features</a>
              <a href="#cli" className="text-white/70 hover:text-white transition">CLI</a>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.location.href = '/Mappa_Installer.exe'}>
                Download Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
            mappa
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Control your terminal with voice commands, powered by advanced AI
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = '/public/Mappa_Installer.exe'}
            >
              <Download className="mr-2 h-5 w-5" />
              Download for Windows
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => window.location.href = 'https://github.com/ghruank/mappa_x'}
            >
              <Terminal className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>
         {/* Tech Stack */}
         <section className="py-16 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-12 items-center justify-items-center">
            {/* Python Logo */}
            <div className="flex flex-col items-center gap-2">
              <Image
                src={py2}
                alt="Python"
                className="w-auto h-16 opacity-80 hover:opacity-100 transition"
              />
              <span className="text-white/70">Python</span>
            </div>
            
            {/* Groq Logo */}
            <div className="flex flex-col items-center gap-2">
              <Image
              src={groq}
              alt="Groq"
              className="w-auto h-16 opacity-80 hover:opacity-100 transition invert"
              />
              <span className="text-white/70">Groq</span>
            </div>
            
            {/* Llama Logo */}
            <div className="flex flex-col items-center gap-2">
              <Image
              src={llama}
              alt="Llama"
              className="w-auto h-16 opacity-80 hover:opacity-100 transition"
              />
              <span className="text-white/70">Llama</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wand2 className="h-8 w-8 mb-4 text-blue-500" />,
                title: 'AI-Powered Commands',
                description: 'Natural language processing for intuitive voice control of your terminal'
              },
              {
                icon: <Terminal className="h-8 w-8 mb-4 text-violet-500" />,
                title: 'Cross-Platform',
                description: 'Works seamlessly across different terminal environments'
              },
              {
                icon: <Download className="h-8 w-8 mb-4 text-pink-500" />,
                title: 'Easy Installation',
                description: 'Simple setup process with pip install'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cli" className="py-24 px-4 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Installation</h2>
          <div className="max-w-2xl mx-auto bg-black/50 backdrop-blur-xl p-6 rounded-lg border border-white/10">
            {commands.map(({ cmd, label }) => (
              <div key={cmd} className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-white">{label}</h3>
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/10">
                  <code className="text-sm text-white overflow-x-auto">{cmd}</code>
                  <button onClick={() => copyToClipboard(cmd)} className="text-white hover:text-blue-400 transition">
                    {copiedCommand === cmd ? <Check className="h-5 w-5" /> : <Clipboard className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            ))}
            <h3 className="text-xl font-semibold mb-4 text-white">Otherwise, download for Windows</h3>
            <div className="flex justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center px-4 py-2 rounded-lg transition"
                onClick={() => window.location.href = '/Mappa_Installer.exe'}>
                <Download className="mr-2 h-5 w-5" />
                Download for Windows
              </button>
            </div>
          </div>
          <p className="text-white/70 mt-4 text-center">Mac and Linux support coming later this year</p>
        </div>
      </section>

      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center text-white/40">
          © 2025 Mappa. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
