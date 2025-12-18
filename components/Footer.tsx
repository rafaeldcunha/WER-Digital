
import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#059669] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-lg">Nutricionista Elite</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6">
              Transformando vidas através da nutrição baseada em evidências. Recupere seu ápice hoje.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-6">Suporte</h5>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-black">Dúvidas Frequentes</a></li>
              <li><a href="#" className="hover:text-black">WhatsApp Suporte</a></li>
              <li><a href="#" className="hover:text-black">Área do Aluno</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-6">Legal</h5>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-black">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-black">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-black">CNPJ: 00.000.000/0001-00</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-50 pt-8 text-center text-xs text-gray-400">
          <p>© 2024 Nutricionista Elite. Todos os direitos reservados. Protocolo Janeiro Ápice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
