document.getElementById("predictBtn").addEventListener("click", async function () {
  const v1 = document.getElementById("v1").value;
  const v2 = document.getElementById("v2").value;
  const v3 = document.getElementById("v3").value;
  const v4 = document.getElementById("v4").value;
  const amount = document.getElementById("amount").value;

  const response = await fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ v1, v2, v3, v4, amount })
  });

  const data = await response.json();
  const resultBox = document.getElementById("resultBox");
  resultBox.innerText = "Result: " + data.result;

  if (data.result === "Fraud") {
    resultBox.style.background = "#fee2e2";
    resultBox.style.color = "#b91c1c";
  } else {
    resultBox.style.background = "#dcfce7";
    resultBox.style.color = "#166534";
  }
});