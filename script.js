document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Logic
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);

    const revealedItems = document.querySelectorAll('.glass-card, section h2, .reveal-on-scroll');
    revealedItems.forEach(item => {
        item.classList.add('reveal-on-scroll');
        observer.observe(item);
    });

    // 2. Training Chart Initialization
    const chartElement = document.getElementById('trainingChart');
    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        
        // Initial static data
    const labels = Array.from({length: 15}, (_, i) => `E${i+1}`);
    const lossData = [0.95, 0.8, 0.65, 0.5, 0.42, 0.35, 0.28, 0.22, 0.18, 0.15, 0.12, 0.1, 0.08, 0.07, 0.06];
    const accData = [0.2, 0.35, 0.5, 0.62, 0.7, 0.78, 0.83, 0.88, 0.91, 0.93, 0.95, 0.96, 0.97, 0.98, 0.99];

    let trainingChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Prediction Error (Loss)',
                data: lossData,
                borderColor: '#0061ff',
                backgroundColor: 'rgba(0, 97, 255, 0.1)',
                borderWidth: 4,
                tension: 0.4,
                pointRadius: 0,
                fill: true
            }, {
                label: 'Model Confidence (Accuracy)',
                data: accData,
                borderColor: '#60efff',
                backgroundColor: 'rgba(96, 239, 255, 0.05)',
                borderWidth: 4,
                tension: 0.4,
                pointRadius: 0,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#94a3b8', font: { weight: 'bold', family: 'Inter' } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#64748b' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b' }
                }
            }
        }
    });

        // Simulation Buttons
        window.simulateTraining = () => {
            // Add random slight "jitter" to the training curve to make it look realistic
            trainingChart.data.datasets[0].data = trainingChart.data.datasets[0].data.map(v => Math.max(0.01, v * (0.85 + Math.random() * 0.1)));
            trainingChart.data.datasets[1].data = trainingChart.data.datasets[1].data.map(v => Math.min(1.0, v * (1.02 + Math.random() * 0.05)));
            trainingChart.update('active');
        };
    
        window.resetPlot = () => {
            trainingChart.data.datasets[0].data = [0.95, 0.8, 0.65, 0.5, 0.42, 0.35, 0.28, 0.22, 0.18, 0.15, 0.12, 0.1, 0.08, 0.07, 0.06];
            trainingChart.data.datasets[1].data = [0.2, 0.35, 0.5, 0.62, 0.7, 0.78, 0.83, 0.88, 0.91, 0.93, 0.95, 0.96, 0.97, 0.98, 0.99];
            trainingChart.update();
        };
    }
});
