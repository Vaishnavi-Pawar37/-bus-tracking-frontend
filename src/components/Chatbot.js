import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css'; 

// 1. THE DICTIONARY: English, Marathi, and Hindi
const translations = {
  en: {
    header: "Live Smart Bus Assistant 🚌",
    placeholder: "Ask about live stats or prices...",
    welcome: "👋 Hi! I am the Live Smart Bus Assistant. Ask me about registration, QR codes, or ask for live data like 'How many buses are active?'",
    connecting: "Connecting to database...",
    errApi: "I'm having trouble connecting to the live database right now.",
    noRoutes: "Currently, there are no live routes configured in the database.",
    feeResp: "🚌 **Fee Verification:** If your fee status shows as 'Not Paid', please visit the Admin office to clear your dues.",
    qrResp: "📱 **QR Code Scanning:** Show your unique QR code to the bus driver's scanner when boarding.",
    fallback: "I'm sorry, I didn't quite catch that. Try asking 'What are the prices?' or 'How many buses are active?'"
  },
  mr: {
    header: "लाईव्ह स्मार्ट बस असिस्टंट 🚌",
    placeholder: "किमती किंवा माहिती विचारा...",
    welcome: "👋 नमस्कार! मी स्मार्ट बस असिस्टंट आहे. मला रजिस्ट्रेशन, QR कोड किंवा 'किती बस चालू आहेत?' याबद्दल विचारा.",
    connecting: "डेटाबेसशी कनेक्ट करत आहे...",
    errApi: "सध्या डेटाबेसशी कनेक्ट करण्यात अडचण येत आहे. कृपया थोड्या वेळाने प्रयत्न करा.",
    noRoutes: "सध्या डेटाबेसमध्ये कोणतेही मार्ग उपलब्ध नाहीत.",
    feeResp: "🚌 **फी पडताळणी:** जर तुमची फी 'Not Paid' दिसत असेल, तर कृपया फी भरण्यासाठी ॲडमिन ऑफिसला भेट द्या.",
    qrResp: "📱 **QR कोड स्कॅनिंग:** बसमध्ये चढताना तुमचा युनिक QR कोड ड्रायव्हरच्या स्कॅनरवर दाखवा.",
    fallback: "क्षमस्व, मला समजले नाही. कृपया 'किमती काय आहेत?' किंवा 'किती बस आहेत?' असे विचारून पहा."
  },
  hi: {
    header: "लाइव स्मार्ट बस असिस्टेंट 🚌",
    placeholder: "लाइव आँकड़े या कीमतें पूछें...",
    welcome: "👋 नमस्ते! मैं स्मार्ट बस असिस्टेंट हूँ। मुझसे रजिस्ट्रेशन, QR कोड या 'कितनी बसें चल रही हैं?' के बारे में पूछें।",
    connecting: "डेटाबेस से कनेक्ट हो रहा है...",
    errApi: "मुझे अभी लाइव डेटाबेस से कनेक्ट करने में परेशानी हो रही है। कृपया थोड़ी देर बाद प्रयास करें।",
    noRoutes: "वर्तमान में डेटाबेस में कोई लाइव रूट उपलब्ध नहीं है।",
    feeResp: "🚌 **फीस सत्यापन:** यदि आपकी फीस 'Not Paid' दिखा रही है, तो कृपया अपनी बकाया राशि चुकाने के लिए एडमिन ऑफिस जाएं।",
    qrResp: "📱 **QR कोड स्कैनिंग:** बस में चढ़ते समय बस ड्राइवर के स्कैनर पर अपना विशिष्ट QR कोड दिखाएं।",
    fallback: "क्षमा करें, मुझे समझ नहीं आया। कृपया 'कीमतें क्या हैं?' या 'कितनी बसें हैं?' पूछने का प्रयास करें।"
  }
};

const Chatbot = () => {
  const [lang, setLang] = useState('en');
  const t = translations[lang]; // Quick reference to current language dictionary

  const [messages, setMessages] = useState([
    { id: 1, text: translations['en'].welcome, sender: "bot" }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle changing the language from the Dropdown
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    // Greet the user in the newly selected language
    setMessages([{ id: Date.now(), text: translations[newLang].welcome, sender: "bot" }]);
  };

  // --- THE HYBRID BRAIN ---
  const fetchBotResponse = async (userText) => {
    const lowerInput = userText.toLowerCase();
    
    // 1. LIVE DATA: System Stats
    if (lowerInput.includes("how many") || lowerInput.includes("stats") || lowerInput.includes("किती बस") || lowerInput.includes("कितनी बसें")) {
      try {
        const res = await axios.get('http://localhost:5000/admin/data');
        const stats = res.data.stats;
        
        if (lang === 'en') {
          return `📊 **Live System Update:** We currently have **${stats.total_buses || 0} total buses** covering **${stats.active_routes || 0} active routes** across **${stats.total_stops || 0} designated stops**. (Active Bus Nos: ${stats.bus_nos || 'None'}).`;
        } else if (lang === 'mr') {
          return `📊 **थेट अपडेट:** सध्या आमच्याकडे **${stats.total_buses || 0} बस** आहेत, ज्या **${stats.active_routes || 0} मार्गांवर** आणि **${stats.total_stops || 0} थांब्यांवर** धावत आहेत. (सक्रिय बस क्रमांक: ${stats.bus_nos || 'नाही'}).`;
        } else {
          return `📊 **लाइव अपडेट:** वर्तमान में हमारे पास **${stats.total_buses || 0} बसें** हैं जो **${stats.active_routes || 0} रूटों** और **${stats.total_stops || 0} स्टॉप्स** पर चल रही हैं। (सक्रिय बस नंबर: ${stats.bus_nos || 'कोई नहीं'})।`;
        }
      } catch (err) {
        return t.errApi;
      }
    }

    // 2. LIVE DATA: Pricing
    else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("किंमत") || lowerInput.includes("कीमत") || lowerInput.includes("फीस") || lowerInput.includes("फी")) {
      try {
        const res = await axios.get('http://localhost:5000/admin/data');
        const busInfo = res.data.busInfo;
        
        if (!busInfo || busInfo.length === 0) return t.noRoutes;
        
        let responseText = lang === 'en' ? "🗺️ **Live Route Pricing:**\n" : lang === 'mr' ? "🗺️ **मार्गावरील किमती:**\n" : "🗺️ **रूट की कीमतें:**\n";
        busInfo.forEach(info => {
          responseText += `• ${info.location} (${info.type}): ₹${info.price}\n`;
        });
        return responseText;
      } catch (err) {
        return t.errApi;
      }
    }

    // 3. STATIC FAQS
    else if (lowerInput.includes("qr") || lowerInput.includes("scan") || lowerInput.includes("स्कॅन") || lowerInput.includes("स्कैन")) {
      return t.qrResp;
    } 
    else if (lowerInput.includes("fee") || lowerInput.includes("pay") || lowerInput.includes("status") || lowerInput.includes("भरणा") || lowerInput.includes("भुगतान")) {
      return t.feeResp;
    }
    else {
      return t.fallback;
    }
  };

  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input; 
    setInput(""); 
    setIsTyping(true); 

    const botResponseText = await fetchBotResponse(currentInput);

    setMessages((prev) => [...prev, { id: Date.now() + 1, text: botResponseText, sender: "bot" }]);
    setIsTyping(false); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container shadow-lg">
      
      {/* Header with Language Dropdown */}
      <div className="chat-header d-flex justify-content-between align-items-center" style={{ backgroundColor: '#0084ff', color: 'white', padding: '15px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{t.header}</span>
        
        {/* NEW: Dropdown menu for 3 languages */}
        <select 
          value={lang} 
          onChange={handleLanguageChange}
          style={{ 
            background: 'white', 
            color: '#0084ff', 
            border: 'none', 
            padding: '5px', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            fontSize: '13px',
            outline: 'none'
          }}
        >
          <option value="en">English</option>
          <option value="mr">मराठी</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>

      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}-message`}>
            {formatText(msg.text)}
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message typing">
            {t.connecting}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={t.placeholder}
          className="chat-input"
        />
        <button onClick={handleSend} className="send-btn">
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chatbot;