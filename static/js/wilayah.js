/**
 * wilayah.js - Cascading dropdown Provinsi > Kabupaten/Kota > Kecamatan
 * Data seluruh Indonesia dari: https://ibnux.github.io/data-indonesia/
 */
(function () {
    var BASE = 'https://ibnux.github.io/data-indonesia';

    function setLoading(el, txt) {
        el.innerHTML = '<option value="">' + txt + '</option>';
        el.disabled = true;
    }
    function setReady(el, placeholder) {
        el.innerHTML = '<option value="">' + placeholder + '</option>';
        el.disabled = false;
    }

    function init() {
        var selProv = document.getElementById('sel-provinsi');
        var selKab  = document.getElementById('sel-kabupaten');
        var selKec  = document.getElementById('sel-kecamatan');
        var inpProv = document.getElementById('inp-provinsi');
        var inpKab  = document.getElementById('inp-kabupaten');
        var inpKec  = document.getElementById('inp-kecamatan');

        if (!selProv) return;

        setLoading(selProv, 'Memuat provinsi...');
        setLoading(selKab,  '-- Pilih Kabupaten/Kota --');
        setLoading(selKec,  '-- Pilih Kecamatan --');

        // Load provinsi
        fetch(BASE + '/provinsi.json')
            .then(function(r){ return r.json(); })
            .then(function(data){
                setReady(selProv, '-- Pilih Provinsi --');
                data.forEach(function(p){
                    var o = document.createElement('option');
                    o.value = p.nama; o.dataset.id = p.id; o.textContent = p.nama;
                    selProv.appendChild(o);
                });
            })
            .catch(function(){
                selProv.innerHTML = '<option value="">Gagal memuat (periksa koneksi)</option>';
            });

        // Provinsi change
        selProv.addEventListener('change', function(){
            var opt = this.options[this.selectedIndex];
            if (inpProv) inpProv.value = this.value;
            if (inpKab)  inpKab.value  = '';
            if (inpKec)  inpKec.value  = '';
            setReady(selKab, '-- Pilih Kabupaten/Kota --');
            setLoading(selKec, '-- Pilih Kecamatan --');
            if (!opt.dataset.id) return;
            setLoading(selKab, 'Memuat kabupaten/kota...');
            fetch(BASE + '/kabupaten/' + opt.dataset.id + '.json')
                .then(function(r){ return r.json(); })
                .then(function(data){
                    setReady(selKab, '-- Pilih Kabupaten/Kota --');
                    data.forEach(function(k){
                        var o = document.createElement('option');
                        o.value = k.nama; o.dataset.id = k.id; o.textContent = k.nama;
                        selKab.appendChild(o);
                    });
                })
                .catch(function(){ selKab.innerHTML = '<option value="">Gagal memuat</option>'; });
        });

        // Kabupaten change
        selKab.addEventListener('change', function(){
            var opt = this.options[this.selectedIndex];
            if (inpKab) inpKab.value = this.value;
            if (inpKec) inpKec.value = '';
            setLoading(selKec, '-- Pilih Kecamatan --');
            if (!opt.dataset.id) return;
            setLoading(selKec, 'Memuat kecamatan...');
            fetch(BASE + '/kecamatan/' + opt.dataset.id + '.json')
                .then(function(r){ return r.json(); })
                .then(function(data){
                    setReady(selKec, '-- Pilih Kecamatan --');
                    data.forEach(function(k){
                        var o = document.createElement('option');
                        o.value = k.nama; o.dataset.id = k.id; o.textContent = k.nama;
                        selKec.appendChild(o);
                    });
                })
                .catch(function(){ selKec.innerHTML = '<option value="">Gagal memuat</option>'; });
        });

        // Kecamatan change
        selKec.addEventListener('change', function(){
            if (inpKec) inpKec.value = this.value;
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
