/**
 * GitHub Badge Injector
 * GitHub: @riyankhamdani
 */

const TOKEN = "MASUKKAN_TOKEN_LU_DI_SINI";
const GITHUB_USERNAME = "riyankhamdani"; 
const KOFI_USERNAME = "muchamatriyankhamdani"; 

// Konfigurasi Badge yang akan dimasukkan
const BADGE_MARKDOWN = `# 🚀 Welcome to My Repository\n\n[![Follow](https://img.shields.io/github/followers/${GITHUB_USERNAME}?label=Follow%20Me&style=for-the-badge&color=0078d4&logo=github)](https://github.com/${GITHUB_USERNAME})&nbsp;&nbsp;[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/${KOFI_USERNAME})\n\n---\n\n`;

async function injectDoubleBadge() {
    console.log("⏳ Memulai proses injeksi badge ke semua repo...");
    
    const reposRes = await fetch('https://api.github.com/user/repos?per_page=100', {
        headers: { 
            'Authorization': `Bearer ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    
    if (!reposRes.ok) {
        console.error("❌ Gagal mengambil data repo. Cek apakah Token Anda valid.");
        return;
    }
    
    const repos = await reposRes.json();

    for (let repo of repos) {
        // Lewati repo fork atau repo global .github
        if (repo.fork || repo.name === '.github') continue;

        const url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/README.md`;
        const fileRes = await fetch(url, { headers: { 'Authorization': `Bearer ${TOKEN}` } });
        
        let sha = null;
        let existingContent = "";

        if (fileRes.ok) {
            const fileData = await fileRes.json();
            sha = fileData.sha;
            existingContent = decodeURIComponent(escape(atob(fileData.content)));
            
            // Bersihkan teks lama jika sebelumnya pernah menggunakan script versi pertama
            if (existingContent.includes("# ☕ Support My Work")) {
                existingContent = existingContent.replace("# ☕ Support My Work\n\n[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/muchamatriyankhamdani)\n\n---\n\n", "");
            }
            // Lewati jika badge sudah terpasang
            if (existingContent.includes("label=Follow%20Me")) {
                console.log(`ℹ️ Repo [${repo.name}] dilewati (Badge sudah terpasang).`);
                continue;
            }
        }

        const newContent = BADGE_MARKDOWN + existingContent;
        const newContentBase64 = btoa(unescape(encodeURIComponent(newContent)));

        const updateRes = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: "docs: update README with GitHub Follow and Ko-fi badges",
                content: newContentBase64,
                sha: sha,
                branch: repo.default_branch
            })
        });

        if (updateRes.ok) {
            console.log(`🎯 Sukses pasang badge di repo: ${repo.name}`);
        } else {
            console.log(`❌ Gagal di repo: ${repo.name} (Status: ${updateRes.status})`);
        }
    }
    console.log("🎉 Selesai semua! Sekarang semua repo Anda sudah memiliki badge.");
}

injectDoubleBadge();
