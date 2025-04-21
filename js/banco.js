
document.addEventListener('DOMContentLoaded', function() {
    
    setupEventListeners();
    updateDateDisplay();
    loadTransactions();
    loadInsuranceOptions();
    checkUserStatus();
  });
  
  
  let accountBalance = 5432.10; 
  const transactions = []; 
  let selectedInsurance = null; 
  
  
  function checkUserStatus() {
    const username = sessionStorage.getItem('username');
    
    if (username) {
      
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('dashboard-section').style.display = 'block';
      
      
      const userDisplayElements = document.querySelectorAll('.user-display');
      userDisplayElements.forEach(element => {
        element.textContent = username;
      });
    }
  }
  
  
  function updateDateDisplay() {
    const dateDisplay = document.querySelector('.date-display');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateDisplay.textContent = today.toLocaleDateString('pt-BR', options);
  }
  
  
  function setupEventListeners() {
    
    document.getElementById('login-button').addEventListener('click', handleLogin);
    
    
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(action => {
      action.addEventListener('click', function() {
        const actionType = this.dataset.action;
        handleQuickAction(actionType);
      });
    });
    
    
    document.getElementById('transfer-button').addEventListener('click', handleTransfer);
    
    
    document.getElementById('amount').addEventListener('input', updateTransferSummary);
    document.getElementById('recipient').addEventListener('input', updateTransferSummary);
    document.getElementById('transfer-type').addEventListener('change', updateTransferSummary);
    document.getElementById('description').addEventListener('input', updateTransferSummary);
    
    
    const loanTermSlider = document.getElementById('loan-term');
    const termValue = document.getElementById('term-value');
    
    loanTermSlider.addEventListener('input', function() {
      termValue.textContent = this.value;
      updateLoanSimulation();
    });
    
    document.getElementById('loan-amount').addEventListener('input', updateLoanSimulation);
    document.getElementById('simulate-button').addEventListener('click', showLoanSimulation);
    document.getElementById('loan-button').addEventListener('click', handleLoanRequest);
    
    
    document.getElementById('coverage').addEventListener('change', updateInsurancePrice);
    document.getElementById('payment-frequency').addEventListener('change', updateInsurancePrice);
    document.getElementById('franchise').addEventListener('change', updateInsurancePrice);
    document.getElementById('insurance-button').addEventListener('click', handleInsuranceRequest);
    document.getElementById('back-button').addEventListener('click', function() {
      document.getElementById('insurance-details').style.display = 'none';
      document.getElementById('insurance-list').style.display = 'block';
    });
    
    
    document.getElementById('message-button').addEventListener('click', function() {
      document.getElementById('message-modal').style.display = 'none';
    });
    
    
    setupModalClose();
  }
  
  
  function setupModalClose() {
    const modal = document.getElementById('message-modal');
    const closeButton = document.querySelector('.close-message-button');
    
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  
  function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username.trim() === '') {
      showMessage('Erro de Login', 'Por favor, digite um nome de usuário.');
      return;
    }
    
    
    sessionStorage.setItem('username', username);
    
    
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    
    
    const userDisplayElements = document.querySelectorAll('.user-display');
    userDisplayElements.forEach(element => {
      element.textContent = username;
    });
  }
  
  
  function handleQuickAction(action) {
    
    document.getElementById('loan-panel').style.display = 'none';
    document.getElementById('insurance-panel').style.display = 'none';
    
    
    switch (action) {
      case 'transfer':
        
        break;
        
      case 'loan':
        document.getElementById('loan-panel').style.display = 'block';
        break;
        
      case 'insurance':
        document.getElementById('insurance-panel').style.display = 'block';
        break;
        
      case 'payment':
        showMessage('Funcionalidade Simulada', 'A funcionalidade de pagamentos está disponível apenas para demonstração e não foi implementada completamente nesta versão.');
        break;
        
      case 'investments':
        showMessage('Funcionalidade Simulada', 'A funcionalidade de investimentos está disponível apenas para demonstração e não foi implementada completamente nesta versão.');
        break;
    }
  }
  
  
  function updateTransferSummary() {
    const amount = document.getElementById('amount').value;
    const recipient = document.getElementById('recipient').value;
    const transferType = document.getElementById('transfer-type').value;
    const description = document.getElementById('description').value;
    
    
    if (amount && recipient) {
      document.getElementById('summary-amount').textContent = formatCurrency(amount);
      document.getElementById('summary-recipient').textContent = recipient;
      document.getElementById('summary-type').textContent = transferType.toUpperCase();
      
      
      if (description) {
        document.getElementById('summary-description').textContent = description;
        document.getElementById('summary-description-row').style.display = 'block';
      } else {
        document.getElementById('summary-description-row').style.display = 'none';
      }
      
      document.getElementById('transfer-summary').style.display = 'block';
    } else {
      document.getElementById('transfer-summary').style.display = 'none';
    }
  }
  
  
  function handleTransfer() {
    const amount = parseFloat(document.getElementById('amount').value.replace(/[^\d.,]/g, '').replace(',', '.'));
    const recipient = document.getElementById('recipient').value;
    const transferType = document.getElementById('transfer-type').value;
    const description = document.getElementById('description').value;
    
    if (isNaN(amount) || amount <= 0) {
      showMessage('Erro na Transferência', 'Por favor, insira um valor válido para a transferência.');
      return;
    }
    
    if (!recipient) {
      showMessage('Erro na Transferência', 'Por favor, insira o destinatário da transferência.');
      return;
    }
    
    
    if (amount > accountBalance) {
      showMessage('Erro na Transferência', 'Saldo insuficiente para realizar esta transferência.');
      return;
    }
    
    
    accountBalance -= amount;
    document.getElementById('balance-display').textContent = formatCurrency(accountBalance);
    
    
    const transaction = {
      id: generateTransactionId(),
      date: new Date(),
      description: description || `Transferência para ${recipient}`,
      amount: amount,
      type: 'outgoing'
    };
    
    transactions.unshift(transaction); 
    updateTransactionsList();
    
    
    document.getElementById('amount').value = '';
    document.getElementById('recipient').value = '';
    document.getElementById('description').value = '';
    document.getElementById('transfer-summary').style.display = 'none';
    
    
    showMessage('Transferência Realizada', `Transferência de ${formatCurrency(amount)} para ${recipient} realizada com sucesso.`);
  }
  
  
  function updateLoanSimulation() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value.replace(/[^\d.,]/g, '').replace(',', '.'));
    const loanTerm = parseInt(document.getElementById('loan-term').value);
    
    if (!isNaN(loanAmount) && loanAmount > 0) {
      
      const monthlyRate = 0.0199;
      
      
      const installment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
      
      
      const totalAmount = installment * loanTerm;
      
      
      document.getElementById('simulation-principal').textContent = formatCurrency(loanAmount);
      document.getElementById('simulation-rate').textContent = '1,99% a.m.';
      document.getElementById('simulation-term').textContent = `${loanTerm} meses`;
      document.getElementById('simulation-installment').textContent = formatCurrency(installment);
      document.getElementById('simulation-total').textContent = formatCurrency(totalAmount);
    }
  }
  
  
  function showLoanSimulation() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value.replace(/[^\d.,]/g, '').replace(',', '.'));
    
    if (isNaN(loanAmount) || loanAmount <= 0) {
      showMessage('Erro na Simulação', 'Por favor, insira um valor válido para o empréstimo.');
      return;
    }
    
    
    document.getElementById('loan-simulation').style.display = 'block';
    document.getElementById('loan-button').style.display = 'block';
  }
  
  
  function handleLoanRequest() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value.replace(/[^\d.,]/g, '').replace(',', '.'));
    const loanTerm = parseInt(document.getElementById('loan-term').value);
    
    
    const isApproved = Math.random() < 0.8;
    
    if (isApproved) {
      
      accountBalance += loanAmount;
      document.getElementById('balance-display').textContent = formatCurrency(accountBalance);
      
      
      const transaction = {
        id: generateTransactionId(),
        date: new Date(),
        description: `Empréstimo - ${loanTerm} meses`,
        amount: loanAmount,
        type: 'incoming'
      };
      
      transactions.unshift(transaction);
      updateTransactionsList();
      
      
      document.getElementById('loan-amount').value = '';
      document.getElementById('loan-term').value = 24;
      document.getElementById('term-value').textContent = '24';
      document.getElementById('loan-simulation').style.display = 'none';
      document.getElementById('loan-button').style.display = 'none';
      
      
      showMessage('Empréstimo Aprovado', `Seu empréstimo de ${formatCurrency(loanAmount)} foi aprovado e o valor foi depositado em sua conta corrente.`);
    } else {
      
      showMessage('Empréstimo Negado', 'Infelizmente seu empréstimo não foi aprovado. Recomendamos tentar um valor menor ou entrar em contato com nosso atendimento para mais informações.');
    }
  }
  
  
  function loadInsuranceOptions() {
    const insuranceList = document.getElementById('insurance-list');
    insuranceList.innerHTML = '';
    
    const insurances = [
      {
        id: 1,
        title: 'Seguro Auto',
        description: 'Proteção completa para seu veículo com cobertura para roubo, furto e danos.',
        icon: 'fa-car',
        hasFranchise: true
      },
      {
        id: 2,
        title: 'Seguro Residencial',
        description: 'Proteja sua casa contra incêndio, roubo, danos elétricos e muito mais.',
        icon: 'fa-home',
        hasFranchise: true
      },
      {
        id: 3,
        title: 'Seguro Viagem',
        description: 'Viaje com tranquilidade com cobertura médica, extravio de bagagem e mais.',
        icon: 'fa-plane',
        hasFranchise: true
      },
      {
        id: 4,
        title: 'Seguro de Vida',
        description: 'Garanta a segurança financeira da sua família em caso de imprevistos.',
        icon: 'fa-heartbeat',
        hasFranchise: false
      },
      {
        id: 5,
        title: 'Seguro Celular',
        description: 'Proteção contra quebra, roubo ou furto do seu smartphone.',
        icon: 'fa-mobile-alt',
        hasFranchise: true
      },
      {
        id: 6,
        title: 'Seguro Empresarial',
        description: 'Proteção completa para o seu negócio, ativos e responsabilidades.',
        icon: 'fa-building',
        hasFranchise: false
      },
      {
        id: 7,
        title: 'Seguro Educacional',
        description: 'Garanta a continuidade dos estudos mesmo em situações adversas.',
        icon: 'fa-graduation-cap',
        hasFranchise: false
      }
    ];
    
    insurances.forEach(insurance => {
      const insuranceCard = document.createElement('div');
      insuranceCard.className = 'insurance-card';
      insuranceCard.dataset.id = insurance.id;
      insuranceCard.dataset.hasFranchise = insurance.hasFranchise;
      
      insuranceCard.innerHTML = `
        <div class="insurance-icon"><i class="fas ${insurance.icon}"></i></div>
        <h3 class="insurance-title">${insurance.title}</h3>
        <p class="insurance-description">${insurance.description}</p>
      `;
      
      insuranceCard.addEventListener('click', function() {
        selectInsurance(insurance);
      });
      
      insuranceList.appendChild(insuranceCard);
    });
  }
  
  
  function selectInsurance(insurance) {
    selectedInsurance = insurance;
    
    
    document.getElementById('selected-insurance-title').textContent = insurance.title;
    
    
    if (insurance.hasFranchise) {
      document.getElementById('franchise-group').style.display = 'block';
    } else {
      document.getElementById('franchise-group').style.display = 'none';
    }
    
    
    document.getElementById('insurance-list').style.display = 'none';
    document.getElementById('insurance-details').style.display = 'block';
    
    
    updateInsurancePrice();
  }
  
  
  function updateInsurancePrice() {
    if (!selectedInsurance) return;
    
    const coverage = document.getElementById('coverage').value;
    const paymentFrequency = document.getElementById('payment-frequency').value;
    const franchise = document.getElementById('franchise') ? document.getElementById('franchise').value : 'normal';
    
    
    let basePrice = 89.90;
    
    
    if (coverage === 'intermediaria') {
      basePrice *= 1.5; 
    } else if (coverage === 'completa') {
      basePrice *= 2; 
    }
    
    
    if (selectedInsurance.hasFranchise) {
      if (franchise === 'reduzida') {
        basePrice *= 1.2; 
      } else if (franchise === 'zero') {
        basePrice *= 1.4; 
      }
    }
    
    
    let priceText = '';
    if (paymentFrequency === 'mensal') {
      priceText = `R$ ${basePrice.toFixed(2).replace('.', ',')}/mês`;
    } else if (paymentFrequency === 'trimestral') {
      const discountedPrice = basePrice * 3 * 0.95; 
      priceText = `R$ ${discountedPrice.toFixed(2).replace('.', ',')}/trimestre`;
    } else if (paymentFrequency === 'anual') {
      const discountedPrice = basePrice * 12 * 0.85; 
      priceText = `R$ ${discountedPrice.toFixed(2).replace('.', ',')}/ano`;
    }
    
    document.getElementById('insurance-price').textContent = priceText;
  }
  
  
  function handleInsuranceRequest() {
    if (!selectedInsurance) {
      showMessage('Erro', 'Nenhum seguro selecionado.');
      return;
    }
    
    const coverage = document.getElementById('coverage').value;
    const paymentFrequency = document.getElementById('payment-frequency').value;
    
    let coverageText = '';
    if (coverage === 'basica') coverageText = 'básica';
    else if (coverage === 'intermediaria') coverageText = 'intermediária';
    else coverageText = 'completa';
    
    let frequencyText = '';
    if (paymentFrequency === 'mensal') frequencyText = 'mensal';
    else if (paymentFrequency === 'trimestral') frequencyText = 'trimestral';
    else frequencyText = 'anual';
    

    showMessage('Seguro Contratado', `Parabéns! Seu ${selectedInsurance.title} com cobertura ${coverageText} e pagamento ${frequencyText} foi contratado com sucesso. Você receberá a confirmação e os detalhes da apólice por e-mail.`);
    
    
    document.getElementById('insurance-details').style.display = 'none';
    document.getElementById('insurance-list').style.display = 'block';
    selectedInsurance = null;
  }
  
  
  function loadTransactions() {
    
    if (transactions.length === 0) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      transactions.push(
        {
          id: generateTransactionId(),
          date: today,
          description: 'Salário',
          amount: 3500.00,
          type: 'incoming'
        },
        {
          id: generateTransactionId(),
          date: yesterday,
          description: 'Supermercado',
          amount: 289.75,
          type: 'outgoing'
        },
        {
          id: generateTransactionId(),
          date: yesterday,
          description: 'Netflix',
          amount: 39.90,
          type: 'outgoing'
        },
        {
          id: generateTransactionId(),
          date: twoDaysAgo,
          description: 'Transferência recebida',
          amount: 150.00,
          type: 'incoming'
        },
        {
          id: generateTransactionId(),
          date: twoDaysAgo,
          description: 'Restaurante',
          amount: 75.50,
          type: 'outgoing'
        }
      );
    }
    
    updateTransactionsList();
  }
  
  
  function updateTransactionsList() {
    const transactionsList = document.getElementById('transactions-list');
    transactionsList.innerHTML = '';
    
    transactions.forEach(transaction => {
      const transactionItem = document.createElement('div');
      transactionItem.className = 'transaction-item';
      
      const iconClass = transaction.type === 'incoming' ? 'incoming-icon' : 'outgoing-icon';
      const icon = transaction.type === 'incoming' ? 'fa-arrow-down' : 'fa-arrow-up';
      const amountClass = transaction.type === 'incoming' ? 'incoming' : 'outgoing';
      const amountPrefix = transaction.type === 'incoming' ? '+ ' : '- ';
      
      transactionItem.innerHTML = `
        <div class="transaction-info">
          <div class="transaction-icon ${iconClass}">
            <i class="fas ${icon}"></i>
          </div>
          <div class="transaction-details">
            <h4>${transaction.description}</h4>
            <span class="transaction-date">${formatDate(transaction.date)}</span>
          </div>
        </div>
        <div class="transaction-amount ${amountClass}">
          ${amountPrefix}${formatCurrency(transaction.amount)}
        </div>
      `;
      
      transactionsList.appendChild(transactionItem);
    });
  }
  
  
  function showMessage(title, text) {
    const modal = document.getElementById('message-modal');
    document.getElementById('message-title').textContent = title;
    document.getElementById('message-text').textContent = text;
    modal.style.display = 'flex';
  }
  
  
  function formatCurrency(value) {
    
    if (typeof value === 'string') {
      value = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
    }
    
    return 'R$ ' + value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  
  function formatDate(date) {
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
  
  function generateTransactionId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }