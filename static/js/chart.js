document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. GRAFIK LINE CHART TREN DIAGNOSA + FILTER
    // ==========================================
    const lineCtx = document.getElementById('lineChart');
    if (lineCtx) {
        const dataRekapan = {
            hari: { labels: ['00:00', '06:00', '12:00', '18:00'], data: [15, 34, 21, 45] },
            minggu: { labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'], data: [120, 190, 300, 500, 200, 300, 450] },
            bulan: { labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'], data: [1200, 2100, 1800, 2400] },
            tahun: { labels: ['2023', '2024', '2025', '2026'], data: [15000, 24000, 32000, 45000] }
        };

        const myChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: dataRekapan.minggu.labels,
                datasets: [{
                    label: 'Total Kasus Terbaca',
                    data: dataRekapan.minggu.data,
                    borderColor: '#15803d',
                    backgroundColor: 'rgba(21, 128, 61, 0.05)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: '#15803d'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });

        const filterSelect = document.getElementById('periodeFilter');
        if (filterSelect) {
            filterSelect.addEventListener('change', function() {
                const selected = this.value;
                if(dataRekapan[selected]) {
                    myChart.data.labels = dataRekapan[selected].labels;
                    myChart.data.datasets[0].data = dataRekapan[selected].data;
                    myChart.update();
                }
            });
        }
    }

    // ==========================================
    // 2. GRAFIK DOUGHNUT CHART DISTRIBUSI
    // ==========================================
    const pieCtx = document.getElementById('pieChart');
    if (pieCtx) {
        new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Common Rust', 'Blight', 'Gray Leaf Spot', 'Healthy'],
                datasets: [{
                    data: [45, 20, 15, 20],
                    backgroundColor: ['#ea580c', '#ca8a04', '#2563eb', '#15803d'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                cutout: '72%'
            }
        });
    }
});