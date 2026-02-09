function login() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	fetch("http://localhost:8081/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password })
	})
		.then(res => {
			if (!res.ok) throw new Error("Invalid credentials");
			return res.json();
		})
		.then(user => {
			localStorage.setItem("user", JSON.stringify(user));
			window.location.href = "index.html";
		})
		.catch(err => alert(err.message));
}
