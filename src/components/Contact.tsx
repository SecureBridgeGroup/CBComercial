import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Fale <span className="text-yellow-400">Conosco</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Entre em contato conosco e descubra como podemos 
            atender às necessidades do seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Informações de Contato</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-red-800" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Endereço</h4>
                  <p className="text-red-100">
                    Rua Ricardo Ramos, nº 9 - Planalto<br />
                    CEP 69.044-770 - Manaus, AM
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-red-800" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Telefones</h4>
                  <p className="text-red-100">
                    +55 92 3016-7065<br />
                    +55 92 99981-5891
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-red-800" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">E-mail</h4>
                  <p className="text-red-100">
                    cb@cbcomercial.com.br<br />
                    fiscal@cbcomercial.com.br
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-red-800" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">WhatsApp</h4>
                  <p className="text-red-100">
                    Atendimento rápido e direto
                  </p>
                  <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Chamar no WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-8">Envie sua Mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu Nome"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Seu E-mail"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Telefone"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Sua Mensagem"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all duration-300"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-yellow-400 text-red-800 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-300 transition-colors transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;