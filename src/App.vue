<template>
	<div
		id="app"
		:class="{
			warm: typeof weather.main != 'undefined' && weather.main.temp > 12,
		}"
	>
		<main>
			<form class="search-box" @submit.prevent="fetchData">
				<input
					type="text"
					placeholder="Search a city"
					class="search-bar"
					v-model="enteredValue"
				/>
			</form>
			<div class="lds-roller" v-if="isLoading">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>

			<p v-if="!isLoading && (!weather || !weather.name)" class="error">
				Oops! Wrong input. Enter a correct city or country .
			</p>
			<div
				class="search-data"
				v-if="
					typeof weather.main != 'undefined' && !isLoading
					// weather &&
					// weather.length > 0
				"
			>
				<h2 class="town">{{ weather.name }}, {{ weather?.sys.country }}</h2>
				<p class="date">{{ getDate() }}</p>
				<div>
					<h1 class="temperature">{{ Math.round(weather.main.temp) }}°C</h1>
				</div>
				<p class="weather">{{ weather.weather[0].main }}</p>
			</div>
		</main>
	</div>
</template>
<script>
export default {
	data() {
		return {
			api_key: '85b78a8880579756efc564872840d902',
			enteredValue: '',
			weather: {},
			error: null,
			isLoading: false,
		}
	},
	methods: {
		fetchData() {
			this.isLoading = true
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${this.enteredValue}&units=metric&appid=${this.api_key}`
			)
				.then(response =>
					// if (response.ok) {
					// 	response.json()
					// }
					// throw new Error('Something went wrong')
					response.json()
				)
				.then(data => {
					this.isLoading = false
					this.weather = data
				})
				.catch(error => {
					console.log(error)
				})

			this.enteredValue = ''
		},
		getDate() {
			const d = new Date()
			const days = [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
			]
			const day = days[d.getDay()]
			const months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			]
			const month = months[d.getMonth()]
			return `${day} ${d.getDate()} ${month} ${d.getFullYear()}`
		},
	},
}
</script>

<style scoped>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
html {
	font-family: sans-serif;
}
#app {
	background-image: url('../assets/cold-bg.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	transition: all 0.5s ease-in-out;
}
#app .warm {
	background-image: url('../assets/warm-bg.jpg');
}
main {
	min-height: 100vh;
	padding: 2rem 0;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.4),
		rgba(0, 0, 0, 0.6)
	);
	text-align: center;
}
.search-box {
	margin-bottom: 3rem;
}
.search-bar {
	width: 90%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	font-size: 1rem;
	border-bottom-left-radius: 15px;
	border-top-right-radius: 15px;
	background-color: rgba(255, 255, 255, 0.5);
	outline: none;
	margin: auto;
	transition: 0.5s ease-out;
	box-shadow: 0 0 9px 9px rgba(0, 0, 0, 0.1);
	font-size: 30px;
}
.search-box .search-bar:focus {
	border-radius: 15px 0 15px 0;
}
.search-data {
	text-align: center;
	padding: 1.5rem 0;
}
.town {
	color: rgb(253, 240, 240);
	font-size: 45px;
	font-weight: bold;
}
.date {
	color: rgb(216, 212, 212);
	font-size: 20px;
	font-weight: bold;
	padding-top: 1rem;
	padding-bottom: 2rem;
}
.temperature {
	font-size: 100px;
	color: white;
	text-shadow: 0px 6px 12px #09030d;
	background: rgba(255, 255, 255, 0.25);
	/* border: 1px solid whitesmoke; */
	padding: 2rem 3rem;
	display: inline-block;
	border-radius: 20px;
}
.weather {
	font-size: 40px;
	font-style: italic;
	color: white;
	padding-top: 2rem;
}
.load {
	font-size: 40px;
	text-align: center;
	color: white;
}

.lds-roller {
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
	text-align: center;
	margin-top: 30px;
}
.lds-roller div {
	animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	transform-origin: 40px 40px;
}
.lds-roller div:after {
	content: ' ';
	display: block;
	position: absolute;
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: #fff;
	margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
	animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
	top: 63px;
	left: 63px;
}
.lds-roller div:nth-child(2) {
	animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
	top: 68px;
	left: 56px;
}
.lds-roller div:nth-child(3) {
	animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
	top: 71px;
	left: 48px;
}
.lds-roller div:nth-child(4) {
	animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
	top: 72px;
	left: 40px;
}
.lds-roller div:nth-child(5) {
	animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
	top: 71px;
	left: 32px;
}
.lds-roller div:nth-child(6) {
	animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
	top: 68px;
	left: 24px;
}
.lds-roller div:nth-child(7) {
	animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
	top: 63px;
	left: 17px;
}
.lds-roller div:nth-child(8) {
	animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
	top: 56px;
	left: 12px;
}
@keyframes lds-roller {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.error {
	font-size: 40px;
	color: #d0f114;
	font-weight: bold;
	text-align: left;
	padding-left: 5rem;
}
</style>
