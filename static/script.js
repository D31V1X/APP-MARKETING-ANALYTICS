document.getElementById('musicForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = document.getElementById('generateBtn');
    const btnText = btn.querySelector('.btn-text');
    const loader = document.getElementById('loader');
    const form = document.getElementById('musicForm');
    const result = document.getElementById('result');

    // UI Loading State
    btnText.style.display = 'none';
    loader.style.display = 'block';
    btn.disabled = true;

    // Gather Data
    const data = {
        emotion: document.getElementById('emotion').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        genre: document.getElementById('musicGenre').value
    };

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resultData = await response.json();

        if (resultData.status === 'success') {
            // Update Result UI
            document.getElementById('songTitle').textContent = resultData.song_title;
            document.getElementById('artistName').textContent = resultData.artist;
            document.getElementById('coverArt').style.background = `linear-gradient(45deg, ${resultData.cover_color}, #111)`;

            // Switch Views
            form.style.display = 'none';
            result.classList.remove('hidden');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al generar la canción. Inténtalo de nuevo.');
    } finally {
        // Reset Button State
        btnText.style.display = 'block';
        loader.style.display = 'none';
        btn.disabled = false;
    }
});

function resetForm() {
    document.getElementById('musicForm').style.display = 'block';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('musicForm').reset();
}
