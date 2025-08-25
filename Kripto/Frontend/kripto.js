const searchbar = document.getElementById("arama");
const input = document.getElementById("ara");
const sonucSymbol = document.querySelector("#sonuc .symbol");
const sonucPrice = document.querySelector("#sonuc .price");

const apikey = "53980a4e-08d1-4cf2-8690-0af566047421";

window.addEventListener("load", () => {
    const savedSymbol = localStorage.getItem("lastSymbol");
    if (savedSymbol) searchbar.value = savedSymbol;
});

input.addEventListener("click", async () => {
    const sembol = searchbar.value.trim().toUpperCase();
    if (!sembol) {
        alert("Lütfen geçerli bir kripto giriniz...");
        return;
    }

    localStorage.setItem("lastSymbol", sembol);

    const url = `http://localhost:3000/price/${sembol}`;

    try {
        let res = await fetch(url);
        if (!res.ok) throw new Error("Backend isteği başarısız: " + res.status);
        let data = await res.json();

        const fiyat = data.data[sembol].quote.USD.price;

        sonucSymbol.innerText = sembol;
        sonucPrice.innerText = `${fiyat.toFixed(2)} USD`;
    } catch(err) {
        console.error("Hata:", err);
        sonucSymbol.innerText = sembol;
        sonucPrice.innerText = "Veri alınamadı!";
    }
});
