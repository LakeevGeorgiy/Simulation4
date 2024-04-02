let k_text = document.getElementById("k_id");
let L1_text = document.getElementById("L1_id");
let L_text = document.getElementById("L_id");
let m_text = document.getElementById("m_id");
let beta_text = document.getElementById("beta_id");
let phi_1_text = document.getElementById("phi_1_id");
let phi_2_text = document.getElementById("phi_2_id");
let button = document.getElementById("button_id");

let k = 0.5;
let L1 = 1;
let L = 1;
let m = 1;
let beta = 0.05;
let phi_1 = 0;
let phi_2 = 12.566;
let A_1 = phi_1;
let A_2 = phi_2;


function omega_01(){
	const g = 9.8;
	return Math.sqrt(g / L);
}

function omega_02(){
	const xi2 = k * L1 ** 2 / (m * L ** 2);
	const g = 9.8;
	return Math.sqrt(g / L + 2 * xi2);
}

function calculate1(i){
	return 1 / 2 * (A_1 * Math.exp(-beta * i) * Math.cos(omega_01() * i + phi_1) + A_2 * Math.exp(-beta* i) * Math.cos(omega_02() * i + phi_2));
}

function calculate2(i){
	return 1 / 2 * (A_1 * Math.exp(-beta * i) * Math.cos(omega_01() * i + phi_1) - A_2 * Math.exp(-beta* i) * Math.cos(omega_02() * i + phi_2));
}

function PlotEMF() {

    let x_coordinates = [];
	let y_coordinates_1 = [];
	let y_coordinates_2 = [];

	let t = 0;
    for (let i = 0; i < 100; i += 0.01){
		x_coordinates[t] = i;
		y_coordinates_1[t] = calculate1(i);
		y_coordinates_2[t] = calculate2(i);
		//console.log(x_coordinates[t], y_coordinates_1[t], y_coordinates_2[t]);
		t += 1;
	}

	console.log(phi_1, phi_2);

    let first = {
        x: x_coordinates, 
        y: y_coordinates_1,
        mode: 'lines'
    };

	let second = {
		x: x_coordinates,
		y: y_coordinates_2,
		mode: 'lines'
	};

    let layout1 = {
		title: 'Совместный график зависимости угла от времени для первого и второго маятника',
        width: 700,
        height: 700
    };

	let layout2 = {
		title: 'График зависимости угла от времени для второго маятника',
        width: 500,
        height: 500
    };

	Plotly.newPlot('tester', [first, second], layout1);
	Plotly.newPlot('tester2', [second], layout2);
}



button.addEventListener("click", function(e){
	
	k = parseFloat(k_text.value);
	L1 = parseFloat(L1_text.value);
	L = parseFloat(L_text.value);
	m = parseFloat(m_text.value);
	beta = parseFloat(beta_text.value);
	phi_1 = parseFloat(phi_1_text.value);
	phi_2 = parseFloat(phi_2_text.value);
    A_1 = phi_1;
	A_2 = phi_2;

	PlotEMF();
});