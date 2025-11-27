// ============================================
// CONFIGURAÇÕES
// ============================================

// O usuário pode adicionar quantos vendedores quiser, o sistema usará o primeiro como padrão
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Configuração dos vendedores
const vendedores = {
    'rose': {
        id: 'vendedor1',
        nome: 'Rose',
        whatsapp: '5543999890545',
        ref: 'rose_natal'
    },
    'regi': {
        id: 'vendedor2', 
        nome: 'Regi',
        whatsapp: '5543999890550',
        ref: 'regi_natal'
    },
    'pri': {
        id: 'vendedor3',
        nome: 'Priscila', 
        whatsapp: '5543988249005',
        ref: 'pri_natal'
    }
};

// Pega o ref da URL ou usa um padrão
const refVendedor = getUrlParameter('ref') || 'rose'; // 'rose' é o padrão
const vendedorSelecionado = vendedores[refVendedor] || vendedores['rose'];

// O usuário pode adicionar quantos kits quiser, o sistema irá renderizar todos
const kits = [
    {
        id: 1,
        title: 'Kit Natal Básico',
        description: 'O presente perfeito para aquecer o Natal em família!',
        products: ['Coletor Solar Premium', 'Controlador Natalino V1', 'Válvula de Retenção Especial'],
        image: 'kit1.png'
    },
    {
        id: 2,
        title: 'Kit Natal Premium', 
        description: 'Celebre o Natal com o conforto do aquecimento solar!',
        products: ['Coletor Solar Plus', 'Controlador Premium V2', 'Válvula Quebra-Vácuo Dourada'],
        image: 'kit2.png'
    },
    {
        id: 3,
        title: 'Kit Natal Deluxe',
        description: 'O presente que aquece corações e piscinas!',
        products: ['Coletor Solar Deluxe', 'Controlador Estrela V3', 'Kit Válvulas Premium'],
        image: 'kit3.png'
    },
    {
        id: 4,
        title: 'Kit Natal Ultra',
        description: 'O máximo em conforto para um Natal inesquecível!',
        products: ['Coletor Solar Ultra', 'Controlador Master V4', 'Sistema Completo Premium'],
        image: 'kit4.png'
    }
];

// Emojis para a chuva - Referências locais
const emojiImages = [
    'emoji1.png',
    'emoji2.png',
    'emoji3.png',
    'emoji4.png',
    'emoji5.png', // Adicionado mais um para variedade
    'emoji6.png'  // Adicionado mais um para variedade
];

// ============================================
// FUNÇÕES
// ============================================

function createQuickRain() {
    const rainContainer = document.getElementById('rainContainer');
    
    const totalEmojis = 200; 

    for (let i = 0; i < totalEmojis; i++) {
        const rainItem = document.createElement('div');
        rainItem.className = 'rain-item';
        
        const randomImage = emojiImages[Math.floor(Math.random() * emojiImages.length)];
        rainItem.innerHTML = `<img src="${randomImage}" alt="emoji">`;
        
        // Posição vertical mais espaçada
        rainItem.style.top = Math.random() * 100 + '%'; // Aumentei para 150%
        
        // Duração MAIS variada (2s a 8s)
        const duration = 5 + Math.random() * 10;
        rainItem.style.animationDuration = duration + 's';
        
        // Atraso MUITO mais distribuído (0s a 10s)
        rainItem.style.animationDelay = Math.random() * 5 + 's'; 
        
        // TAMANHOS mais variados (15px a 120px)
        const size = 15 + Math.random() * 105;
        rainItem.style.width = size + 'px';
        rainItem.style.height = size + 'px';

        // ROTAÇÃO mais suave (0 a 30 graus)
        const initialRotation = Math.random() * 30;
        rainItem.style.transform = `rotate(${initialRotation}deg)`;

        rainContainer.appendChild(rainItem);
    }
}

function renderKits() {
    const kitsGrid = document.getElementById('kitsGrid');
    
    // Seleciona o primeiro vendedor como padrão. O usuário pode mudar a lógica aqui.
    const vendedorSelecionado = vendedores[0]; 

    kits.forEach((kit, index) => {
        const card = document.createElement('div');
        card.className = 'kit-card';
        card.style.animationDelay = (index * 0.2) + 's';
        
        const productsHTML = kit.products.map(product => 
            `<li>${product}</li>`
        ).join('');
        
        // Mensagem personalizada para o WhatsApp
        const whatsappMessage = encodeURIComponent(
            `Olá! Gostaria de mais informações sobre o kit "${kit.title}" (ID: ${kit.id}). Por favor, me ajude com a compra!`
        );
        
        // Link do WhatsApp com o parâmetro 'ref' para rastreamento do vendedor
        const whatsappLink = `https://wa.me/${vendedorSelecionado.whatsapp}?text=${whatsappMessage}&ref=${vendedorSelecionado.ref}`;
        
        card.innerHTML = `
            <div class="kit-image">
                <img src="${kit.image}" alt="${kit.title}">
            </div>
            <div class="kit-content">
                <h3 class="kit-title">${kit.title}</h3>
                <p class="kit-description">${kit.description || ''}</p>
                <ul class="kit-products">
                    ${productsHTML}
                </ul>
                <a href="${whatsappLink}" target="_blank" class="kit-button">
                    Quero esse Kit
                </a>
            </div>
        `;
        
        kitsGrid.appendChild(card);
    });
}

// ============================================
// SEQUÊNCIA DE EVENTOS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderKits();

    const mainHeader = document.getElementById('mainHeader');
    const thankYouSection = document.getElementById('thankYouSection');
    const rainContainer = document.getElementById('rainContainer');
    const fogOverlay = document.getElementById('fogOverlay');
    const mainContainer = document.getElementById('mainContainer');

    // FASE 1: Agradecimento por 3 segundos
    setTimeout(() => {
        // Esconder agradecimento
        thankYouSection.classList.add('hidden');
        
        // Iniciar chuva
        rainContainer.classList.add('active');
        createQuickRain();

        // Após 3 segundos de chuva, iniciar nevoal e esconder chuva
        setTimeout(() => {
            fogOverlay.classList.add('active');
            rainContainer.classList.add('fading');
            
            // Após 500ms, mostrar kits e cabeçalho, esconder nevoal
            setTimeout(() => {
                mainContainer.classList.add('visible');
                fogOverlay.classList.add('fading');
            }, 500);
            
        }, 4000); // 3 segundos de chuva
        
    }, 4000);
});
