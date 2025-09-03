const isGitHub = window.location.hostname.includes("github.io");

document.getElementById("f").addEventListener("submit", async function(e) {
  e.preventDefault();
  output.textContent = "Saving...";
  output.style.color = "black";

  const payload = {
    name: document.getElementById("name").value,
    score: document.getElementById("score").value
  };

  if (isGitHub) {
    // Simulate saving for GitHub Pages
    setTimeout(() => {
      output.textContent = "✅ Data saved (mock)";
      output.style.color = "green";
      e.target.reset();
    }, 500);
    return;
  }

  // Real Apps Script POST
  try {
    const res = await fetch("https://script.google.com/macros/s/YOUR_APPS_SCRIPT_URL/exec", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    if (data.status === "success") {
      output.textContent = "✅ " + data.message;
      output.style.color = "green";
      e.target.reset();
    } else {
      output.textContent = "❌ " + (data.message || "Unknown error");
      output.style.color = "red";
    }

  } catch (err) {
    output.textContent = "❌ Error: " + err.message;
    output.style.color = "red";
  }
});
