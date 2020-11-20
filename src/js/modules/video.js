const video = () => {
    const elementVideo = document.querySelector('.cont-video');
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    if (viewportWidth > 1024 || !'ontouchstart' in window || !navigator.maxTouchPoints) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        let player;

        let onYouTubeIframeAPIReady = () => {
            if (elementVideo !== null) {
                const idVideo = elementVideo.dataset.id;

                player = new YT.Player('player', {
                    videoId: idVideo,
                    playerVars: {
                        // 'autoplay': 1,
                        'rel': 0,
                        'showinfo': 0,
                        'modestbranding': 1,
                        'playsinline': 1,
                        'showinfo': 0,
                        'rel': 0,
                        'controls': 0,
                        'color': 'red',
                        'mute': 0,
                        'origin': window.location.origin
                    },
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
            }
        }

        setTimeout(() => {
            onYouTubeIframeAPIReady();
        }, 400);

        let ready = false;
        let onPlayerReady = () => {
            ready = true;

            const playButton = document.querySelector(".button-play.play");
            const pauseButton = document.querySelector(".button-play.pause");
            const iframeYT = document.querySelector(".wrapVideo");
            // const voluemnButton = document.querySelector(".button-volume");

            iframeYT.addEventListener("click", function () {
                let pst = player.getPlayerState();
                if (pst == 0 || pst == 2 || pst == 5) {
                    document.querySelector(".pause").classList.remove('d-none');
                    document.querySelector(".play").classList.add('d-none');
                    player.playVideo();
                }
            });

            playButton.addEventListener("click", function () {
                let pst = player.getPlayerState();
                if (pst == 0 || pst == 2 || pst == 5) {
                    document.querySelector(".pause").classList.remove('d-none');
                    document.querySelector(".play").classList.add('d-none');
                    player.playVideo();
                }
            });

            pauseButton.addEventListener("click", function () {
                let pst = player.getPlayerState();
                if (pst == 1) {
                    document.querySelector(".play").classList.remove('d-none');
                    document.querySelector(".pause").classList.add('d-none');
                    player.pauseVideo();
                }
            });

            // voluemnButton.addEventListener("click", function () {
            //     if (player.isMuted()) {
            //         player.unMute();
            //     } else {
            //         player.mute();
            //     }
            // });

            var query = document.querySelector.bind(document);
            query('#fullsize').addEventListener('click', function () {
                player.playVideo();
                var playerElement = query("#player");
                var requestFullScreen = playerElement.requestFullScreen || playerElement.mozRequestFullScreen || playerElement.webkitRequestFullScreen;
                if (requestFullScreen) {
                    requestFullScreen.bind(playerElement)();
                }
            });

            window.addEventListener('resize', function (event) {
                console.log(window.innerWidth);
                if (window.innerWidth < 768) {
                    player.pauseVideo();
                } else {
                    player.playVideo();
                }
            });
        }

        let getProgress = () => {
            console.log(player.getCurrentTime());
        }

        let myTimer;
        let onPlayerStateChange = (event) => {
            if (event.data === YT.PlayerState.ENDED) {
                player.playVideo();
            }



            if (event.data == 1) {
                myTimer = setInterval(() => {
                    const currentTime = player.getCurrentTime();
                    const minutes = Math.floor(currentTime / 60) < 10 ? '0' + Math.floor(currentTime / 60.000) : Math.floor(currentTime / 60.000);
                    const seconds = Math.floor(currentTime % 60) < 10 ? '0' + Math.floor(currentTime % 60.000) : Math.floor(currentTime % 60.000);

                    const progress_field = document.querySelector('.progress');

                    document.querySelector(".next_time").innerText = minutes + ':' + seconds;

                    const progress = Math.round(player.getCurrentTime() / player.getDuration() * 100);
                    progress_field.style.width = progress + "%";
                });
            } else {
                clearInterval(myTimer);
            }
        }
    }
}

export { video };