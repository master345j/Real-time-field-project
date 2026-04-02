<!DOCTYPE html>  
<html lang="en">  
<head>  
  <meta charset="UTF-8" />  
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>  
  <title>Super Aggregator</title>  
  <script src="https://cdn.tailwindcss.com"></script>  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">  
  <script>  
    tailwind.config = {  
      theme: {  
        extend: {  
          colors: {  
            primary: '#4f46e5',  
            'primary-dark': '#4338ca',  
            'bg-light': '#f9fafb',  
            'border-light': '#e5e7eb'  
          }  
        }  
      }  
    }  
  </script>  
  <style>  
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');  
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }  
  </style>  
</head>  
<body class="bg-gray-50 text-gray-800 antialiased">  

  <!-- Header -->  
  <header class="bg-white shadow-sm sticky top-0 z-10">  
    <div class="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">  
      <div class="flex items-center gap-3">  
        <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">  
          <span class="text-white font-bold text-lg">SA</span>  
        </div>  
        <h1 class="text-xl font-bold text-gray-900">Super Aggregator</h1>  
      </div>  
      <div class="relative w-full max-w-md">  
        <input  
          type="text"  
          placeholder="Search across news, jobs, prices & tools..."  
          class="w-full px-4 py-2.5 pl-11 rounded-lg border border-border-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"  
        />  
        <i class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 fas fa-search"></i>  
      </div>  
      <nav class="hidden sm:flex gap-6">  
        <a href="#" class="font-medium text-primary hover:text-primary-dark transition">Home</a>  
        <a href="#" class="font-medium text-gray-600 hover:text-gray-900 transition">News</a>  
        <a href="#" class="font-medium text-gray-600 hover:text-gray-900 transition">Jobs</a>  
        <a href="#" class="font-medium text-gray-600 hover:text-gray-900 transition">Prices</a>  
        <a href="#" class="font-medium text-gray-600 hover:text-gray-900 transition">Tools</a>  
      </nav>  
    </div>  
  </header>  

  <!-- Hero -->  
  <section class="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">  
    <div class="container mx-auto px-4 text-center max-w-3xl">  
      <h2 class="text-4xl md:text-5xl font-bold mb-4">One Place. Everything.</h2>  
      <p class="text-xl opacity-90 mb-8">  
        Unify real-time data across domains—news, jobs, crypto, e-commerce, dev tools—and explore smarter.  
      </p>  
      <div class="flex flex-col sm:flex-row justify-center gap-4">  
        <button class="px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow hover:bg-gray-100 transition">  
          Get Started  
        </button>  
        <button class="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">  
          View Demo  
        </button>  
      </div>  
    </div>  
  </section>  

  <!-- Features -->  
  <section class="py-16 bg-bg-light">  
    <div class="container mx-auto px-4">  
      <div class="text-center mb-12">  
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Powerful
