// Endpoint para status
app.get('/api/status/:cpf', async (req, res) => {
    const cpf = req.params.cpf;
    const cards = await Card.find({ cpf });

    if (cards.length === 0) {
        return res.json({ success: false });
    }

    // Simulação de números faltantes
    const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    const missingNumbers = allNumbers.filter(number => Math.random() > 0.5);

    res.json({
        success: true,
        missingNumbers
    });
});
// Endpoint para estatísticas
app.get('/api/statistics', async (req, res) => {
    const cardStats = await Card.aggregate([
        {
            $group: {
                _id: "$cpf",
                cartelas: { $sum: 1 }
            }
        }
    ]);

    // Simulação de dados para cartelas completas
    const completedStats = cardStats.map(stat => ({
        cpf: stat._id,
        completed: Math.floor(Math.random() * 10) // Simule a quantidade de cartelas completas
    }));

    res.json({
        cpfStatistics: cardStats,
        completedStatistics: completedStats
    });
});
