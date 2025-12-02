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
        description: 'Presenteie seu estoque! O início perfeito para as vendas de Natal.',
        products: ['30un - Coletor de 3.00M', '3un - Kits Fechamento', '2un - Válvulas', '1un - Controlador'],
        bonus: 'R$200',
        image: 'kit1.png'
    },
    {
        id: 2,
        title: 'Kit Natal Premium', 
        description: 'Seu Natal mais lucrativo! Produtos estratégicos para presentear seu faturamento.',
        products: ['40un - Coletor de 3.00M', '2un - Kits Fechamento', '2un - Válvulas Quebra-vácuo', '2un - Válvulas de Retenção'],
        bonus: 'R$300',
        image: 'kit2.png'
    },
    {
        id: 3,
        title: 'Kit Natal Pro',
        description: 'O presente do Papai Noel para seu negócio! Volume ideal para a alta demanda natalina.',
        products: ['110un - Coletor de 3.00M', '10un - Kits Fechamento'],
        bonus: 'R$500',
        image: 'kit3.png'
    },
    {
        id: 4,
        title: 'Kit Natal Ultra',
        description: 'A estrela do seu Natal! O maior bônus para iluminar suas vendas.',
        products: ['120un - Coletor de 3.00M', '10un - Kits Fechamento', '7un - Válvulas Quebra-vácuo', '7un - Válvulas de Retenção'],
        bonus: 'R$1.000',
        image: 'kit4.png'
    }
];

// Emojis para a chuva - Referências locais
const emojiImages = [
    'emoji1.png',
    'emoji2.png',
    'emoji3.png',
    'emoji4.png',
    'emoji5.png',
    'emoji6.png'
];

// ============================================
// FUNÇÕES
// ============================================

function createQuickRain() {
    const rainContainer = document.getElementById('rainContainer');
    if (!rainContainer) {
        console.error('Elemento rainContainer não encontrado!');
        return;
    }
    
    const totalEmojis = 300; 

    for (let i = 0; i < totalEmojis; i++) {
        const rainItem = document.createElement('div');
        rainItem.className = 'rain-item';
        
        const randomImage = emojiImages[Math.floor(Math.random() * emojiImages.length)];
        rainItem.innerHTML = `<img src="${randomImage}" alt="emoji">`;
        
        // Posição vertical mais espaçada
        rainItem.style.top = Math.random() * 100 + '%';
        
        // Duração variada
        const duration = 5 + Math.random() * 10;
        rainItem.style.animationDuration = duration + 's';
        
        // Atraso distribuído
        rainItem.style.animationDelay = Math.random() * 1 + 's'; 
        
        // Tamanhos variados
        const size = 15 + Math.random() * 105;
        rainItem.style.width = size + 'px';
        rainItem.style.height = size + 'px';

        // Rotação suave
        const initialRotation = Math.random() * 30;
        rainItem.style.transform = `rotate(${initialRotation}deg)`;

        rainContainer.appendChild(rainItem);
    }
}

function renderKits() {
    const kitsGrid = document.getElementById('kitsGrid');
    if (!kitsGrid) {
        console.error('Elemento kitsGrid não encontrado!');
        return;
    }
    
    // PEGAR O VENDEDOR CORRETO AQUI DENTRO DA FUNÇÃO
    const refVendedor = getUrlParameter('ref') || 'rose';
    const vendedorSelecionado = vendedores[refVendedor] || vendedores['rose'];
    
    console.log('Vendedor selecionado:', vendedorSelecionado);
    
    kits.forEach((kit, index) => {
        const card = document.createElement('div');
        card.className = 'kit-card';
        card.style.animationDelay = (index * 0.2) + 's';
        
        const productsHTML = kit.products.map(product => 
            `<li>${product}</li>`
        ).join('');
        
        // Formatando os produtos para a mensagem do WhatsApp
        const productsForWhatsApp = kit.products.map(product => `-${product}`).join('\n');
        
        // Nova mensagem personalizada para o WhatsApp
        const whatsappMessage = encodeURIComponent(
            `Olá! Fiquei interessado no kit "${kit.title}" com BÔNUS DE FRETE de ${kit.bonus}, poderia me montar um orçamento?\n\n` +
            `{productsForWhatsApp}\n\n` +
            `Obrigado!`
        );
        
        // Link do WhatsApp com o parâmetro 'ref' para rastreamento do vendedor
        const whatsappLink = `https://wa.me/${vendedorSelecionado.whatsapp}?text=${whatsappMessage}`;
        
        // Determina a classe de destaque para o Kit 4
        const bonusClass = kit.id === 4 ? 'glowing-bonus-value' : '';
        
        card.innerHTML = `
            <div class="kit-image">
                <img src="${kit.image}" alt="${kit.title}">
            </div>
            <div class="kit-bonus-badge">
                BÔNUS NO FRETE: <span class="bonus-value ${bonusClass}">${kit.bonus}</span>
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
// SEQUÊNCIA DE EVENTOS (CORRIGIDA)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Carregado - Iniciando sequência...');
    
    // Renderizar kits primeiro
    renderKits();

    const thankYouSection = document.getElementById('thankYouSection');
    const rainContainer = document.getElementById('rainContainer');
    const fogOverlay = document.getElementById('fogOverlay');
    const mainContainer = document.getElementById('mainContainer');

    // Verificar se todos os elementos existem
    if (!thankYouSection || !rainContainer || !fogOverlay || !mainContainer) {
        console.error('Um ou mais elementos não foram encontrados no DOM!');
        return;
    }

    console.log('Iniciando sequência de transição...');

    // FASE 1: Agradecimento por 4 segundos (aumentei o tempo)
    setTimeout(() => {
        console.log('Fase 1: Escondendo agradecimento...');
        
        // Esconder agradecimento
        thankYouSection.classList.add('hidden');
        
        // Iniciar chuva
        rainContainer.classList.add('active');
        createQuickRain();

        console.log('Fase 2: Chuva iniciada...');

        // Após 4 segundos de chuva, iniciar nevoal e esconder chuva
        setTimeout(() => {
            console.log('Fase 3: Iniciando nevoal...');
            
            fogOverlay.classList.add('active');
            rainContainer.classList.add('fading');
            
            // Após 500ms, mostrar kits e esconder nevoal
            setTimeout(() => {
                console.log('Fase 4: Mostrando kits...');
                
                mainContainer.classList.add('visible');
                fogOverlay.classList.add('fading');
                
                console.log('Sequência completa!');
                
            }, 500);
            
        }, 2000); // 4 segundos de chuva
        
    }, 1500); // 4 segundos na tela inicial
});
