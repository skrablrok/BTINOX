
document.getElementById("readmore-section").addEventListener("toggle", function() {
    const imgContainer = document.getElementById("dynamic-image1");

    if (this.open) {
        imgContainer.innerHTML = `<img src="far_biofar/skid.png" alt="Avtomatizacija">`;
    } else {
        imgContainer.innerHTML = ''; // počisti slike
    }
});












document.getElementById("readmore-section").addEventListener("toggle", function() {
    const imgContainer = document.getElementById("dynamic-image2");

    if (this.open) {
        imgContainer.innerHTML = `<img src="far_biofar/skid.png" alt="Avtomatizacija">`;
    } else {
        imgContainer.innerHTML = ''; // počisti slike
    }
});