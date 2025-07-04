<template>
    <div class="bg-purple">
        <div class="stars">
            <div class="mx-auto central-body">
                <img class="image-404 img-fluid" src="http://salehriaz.com/404Page/img/404.svg" width="350px">
            </div>
            <div class="objects">
                <img class="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px">
                <div class="earth-moon">
                    <img class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px">
                    <div class="moon-orbit">
                        <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px">
                    </div>
                </div>
                <div class="box_astronaut">
                    <img class="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px">
                </div>
            </div>
            <div class="glowing_stars">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorView',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Dosis:300,400,500');

.bg-purple {
    background: url(http://salehriaz.com/404Page/img/bg_purple.png);
    height: 100vh;
    overflow: hidden;
}

.central-body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-404 {
    position: relative;
    z-index: 120;
}



/* ======================================================================= moon */

@keyframes moon-orbit {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.earth-moon {
    position: absolute;
    top: 15%;
    left: 10%;
    width: 200px;
    height: 200px;
    z-index: 90;
}

.moon-orbit {
    position: absolute;
    top: 40%;
    left: 40%;
    width: 120px;
    height: 120px;
    margin: -60px 60px 60px -60px;
    animation: moon-orbit 8s linear infinite;
}

.object_moon {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
}



/* ======================================================================= rocket */

@-moz-keyframes rocket-movement {
    100% {
        -moz-transform: translate(1200px, -600px);
    }
}

@-webkit-keyframes rocket-movement {
    100% {
        -webkit-transform: translate(1200px, -600px);
    }
}

@keyframes rocket-movement {
    100% {
        transform: translate(1200px, -600px);
    }
}

.object_rocket {
    z-index: 95;
    position: absolute;
    transform: translateX(-50px);
    top: 75%;
    left: 20%;
    width: 60px;
    pointer-events: none;
    animation: rocket-movement 200s linear infinite both running;
}



/* ======================================================================= earth */

@-moz-keyframes spin-earth {
    100% {
        -moz-transform: rotate(-360deg);
        transition: transform 20s;
    }
}

@-webkit-keyframes spin-earth {
    100% {
        -webkit-transform: rotate(-360deg);
        transition: transform 20s;
    }
}

@keyframes spin-earth {
    100% {
        -webkit-transform: rotate(-360deg);
        transform: rotate(-360deg);
        transition: transform 20s;
    }
}

.object_earth {
    position: absolute;
    top: 20%;
    left: 15%;
    z-index: 90;
    animation: spin-earth 100s infinite linear both;
}



/* ======================================================================= astronaut */

@-moz-keyframes move-astronaut {
    100% {
        -moz-transform: translate(-160px, -160px);
    }
}

@-webkit-keyframes move-astronaut {
    100% {
        -webkit-transform: translate(-160px, -160px);
    }
}

@keyframes move-astronaut {
    100% {
        -webkit-transform: translate(-160px, -160px);
        transform: translate(-160px, -160px);
    }
}

@-moz-keyframes rotate-astronaut {
    100% {
        -moz-transform: rotate(-720deg);
    }
}

@-webkit-keyframes rotate-astronaut {
    100% {
        -webkit-transform: rotate(-720deg);
    }
}

@keyframes rotate-astronaut {
    100% {
        -webkit-transform: rotate(-720deg);
        transform: rotate(-720deg);
    }
}

.object_astronaut {
    animation: rotate-astronaut 200s infinite linear both alternate;
}

.box_astronaut {
    z-index: 110 !important;
    position: absolute;
    top: 60%;
    right: 20%;
    will-change: transform;
    animation: move-astronaut 50s infinite linear both alternate;
}



/* ======================================================================= start */

.stars {
    background: url(http://salehriaz.com/404Page/img/overlay_stars.svg);
    background-repeat: repeat;
    background-size: contain;
    background-position: left top;
}

@-moz-keyframes glow-star {
    40% {
        -moz-opacity: 0.3;
    }

    90%,
    100% {
        -moz-opacity: 1;
        -moz-transform: scale(1.2);
    }
}

@-webkit-keyframes glow-star {
    40% {
        -webkit-opacity: 0.3;
    }

    90%,
    100% {
        -webkit-opacity: 1;
        -webkit-transform: scale(1.2);
    }
}

@keyframes glow-star {
    40% {
        -webkit-opacity: 0.3;
        opacity: 0.3;
    }

    90%,
    100% {
        -webkit-opacity: 1;
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        border-radius: 999999px;
    }
}

.glowing_stars .star {
    position: absolute;
    border-radius: 100%;
    background-color: #fff;
    width: 3px;
    height: 3px;
    opacity: 0.3;
    will-change: opacity;
}

.glowing_stars .star:nth-child(1) {
    top: 80%;
    left: 25%;
    animation: glow-star 2s infinite ease-in-out alternate 1s;
}

.glowing_stars .star:nth-child(2) {
    top: 20%;
    left: 40%;
    animation: glow-star 2s infinite ease-in-out alternate 3s;
}

.glowing_stars .star:nth-child(3) {
    top: 25%;
    left: 25%;
    animation: glow-star 2s infinite ease-in-out alternate 5s;
}

.glowing_stars .star:nth-child(4) {
    top: 75%;
    left: 80%;
    animation: glow-star 2s infinite ease-in-out alternate 7s;
}

.glowing_stars .star:nth-child(5) {
    top: 90%;
    left: 50%;
    animation: glow-star 2s infinite ease-in-out alternate 9s;
}



/* ======================================================================= responsive */

@media only screen and (max-width: 700px) {
    .earth-moon {
        top: 12%;
    }

    .box_astronaut {
        top: 85%;
    }

    .object_astronaut {
        height: 150px;
    }

    .image-404 {
        width: 250px;
    }
}

@media only screen and (max-width: 360px) {
    .object_astronaut {
        height: 100px;
    }

    .image-404 {
        width: 200px;
    }
}
</style>
