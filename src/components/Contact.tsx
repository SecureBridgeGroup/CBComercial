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
    alert('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: 'Endereço',
      text: <>Rua Ricardo Ramos, nº 9 - Planalto<br />CEP 69.044-770 - Manaus, AM</>
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: 'Telefones',
      text: <>+55 92 3016-7065<br />+55 92 99981-5891</>
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: 'E-mail',
      text: <>cb@cbcomercial.com.br<br />fiscal@cbcomercial.com.br</>
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: 'WhatsApp',
      text: (
        <>
          Atendimento rápido e direto<br />
          <a
            href="https://wa.me/5592999815891"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            aria-label="Falar no WhatsApp"
          >
            Chamar no WhatsApp
          </a>
        </>
      )
    }
  ];

  return (
    <section
      id="contato"
      className="py-24 relative bg-gradient-to-br from-[#f2f6fc] via-[#e7f0ff] to-white overflow-hidden scroll-mt-16"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern-light.svg')] bg-cover opacity-10 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Fale <span className="text-primary">Conosco</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entre em contato conosco e descubra como podemos atender às necessidades do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info Blocks */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Informações de Contato</h3>

            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Envie sua Mensagem</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {['name', 'email', 'phone'].map((field) => (
                <input
                  key={field}
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={
                    field === 'name' ? 'Seu Nome' : field === 'phone' ? 'Telefone' : 'Seu E-mail'
                  }
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              ))}

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Sua Mensagem"
                rows={6}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300"
              />

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
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
