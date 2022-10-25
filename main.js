const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');
const player = $('.player');
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Waiting For You",
            singer: "MONO, Onionn",
            path: "https://stream.nixcdn.com/NhacCuaTui2026/WaitingForYou-MONOOnionn-7733882.mp3?st=IIEkyIw9n78j3db6E8Fh3Q&e=1666746862",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO7bFIp7yoJyHMTSLa_68rL5xZreZ7pSxhaQ&usqp=CAU"
        },
        {
            name: "Em Là",
            singer: "MONO, Onionn",
            path: "https://stream.nixcdn.com/NhacCuaTui2026/EmLa-MONOOnionn-7736094.mp3?st=4ROREG5p-CkgzOjXm-g5xQ&e=1666753134",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO7bFIp7yoJyHMTSLa_68rL5xZreZ7pSxhaQ&usqp=CAU"
        },
        {
            name: "Vì Mẹ Anh Bắt Chia Tay",
            singer: "Miu Lê, Karik, Châu Đăng Khoa",
            path:
                "https://stream.nixcdn.com/NhacCuaTui2022/ViMeAnhBatChiaTay-MiuLe-7503053.mp3?st=hzIp_o9-G8FxS43mbdUxrQ&e=1666675741",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/06/14/9/6/4/c/1655187824693.jpg"
        },
        {
            name: "Mang Tiền Về Cho Mẹ",
            singer: "Đen",
            path: "https://data.chiasenhac.com/down2/2215/2/2214701-52396a51/128/Mang%20Tien%20Ve%20Cho%20Me%20-%20Den_%20Nguyen%20Thao.mp3",
            image:
                "https://o.vdoc.vn/data/image/2021/12/31/bo-anh-che-mang-tien-ve-cho-me-1.jpg"
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path:
                "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image:
                "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
        },
        {
            name: "Vì Mẹ Anh Bắt Chia Tay",
            singer: "Miu Lê, Karik, Châu Đăng Khoa",
            path:
                "https://stream.nixcdn.com/NhacCuaTui2022/ViMeAnhBatChiaTay-MiuLe-7503053.mp3?st=hzIp_o9-G8FxS43mbdUxrQ&e=1666675741",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/06/14/9/6/4/c/1655187824693.jpg"
        },
        {
            name: "Em Là",
            singer: "MONO, Onionn",
            path: "https://stream.nixcdn.com/NhacCuaTui2026/EmLa-MONOOnionn-7736094.mp3?st=4ROREG5p-CkgzOjXm-g5xQ&e=1666753134",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO7bFIp7yoJyHMTSLa_68rL5xZreZ7pSxhaQ&usqp=CAU"
        },
        {
            name: "Mang Tiền Về Cho Mẹ",
            singer: "Đen",
            path: "https://data.chiasenhac.com/down2/2215/2/2214701-52396a51/128/Mang%20Tien%20Ve%20Cho%20Me%20-%20Den_%20Nguyen%20Thao.mp3",
            image:
                "https://o.vdoc.vn/data/image/2021/12/31/bo-anh-che-mang-tien-ve-cho-me-1.jpg"
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div data-index=${index} class="song  ${index === this.currentIndex ? 'active' : ''}">
                <div class="thumb" style="background-image: url('${song.image}')">
                  </div>
                 <div class="body">
                   <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                </div>
                 <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                  </div>
             </div>
            `;
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function () {

        const cdWidth = cd.offsetWidth;

        //xử lý cd quay
        const cdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        //xử lý phóng to thu nhỏ
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        //click play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                app.isPlaying = false
                audio.pause();
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            } else {
                app.isPlaying = true
                audio.play();
                player.classList.add('playing')
                cdThumbAnimate.play()
            }

        }
        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        //tua 
        progress.onchange = e => {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime
        }
        //khi next 
        nextBtn.onclick = () => {
            if (app.isRandom) {
                app.playRandomSong();

            } else {
                app.nextSong();
            }

            if (app.isPlaying) {
                audio.play()
            }
            app.render();
            app.scrollToActiveSong()
        }
        //prev
        prevBtn.onclick = () => {
            if (app.isRandom) {
                app.playRandomSong();
            } else {
                app.prevSong();
            }

            if (app.isPlaying) {
                audio.play()
            }
            app.render();
            app.scrollToActiveSong()
        }
        //random
        randomBtn.onclick = () => {
            if (this.isRandom) {
                this.isRandom = false
                randomBtn.classList.remove('active')
            } else {
                randomBtn.classList.add('active')
                this.isRandom = true
            }

        }

        //repeat
        repeatBtn.onclick = () => {
            if (this.isRepeat) {
                this.isRepeat = false
                repeatBtn.classList.remove('active')
            } else {
                repeatBtn.classList.add('active')
                this.isRepeat = true
            }

        }

        //next khi hết bài
        audio.onended = () => {
            if (app.isRepeat) {
                audio.play()
            } else if (app.isRandom) {
                app.playRandomSong();
                audio.play()
            }

            else if (app.isPlaying) {
                app.nextSong();
                audio.play()
            }
            app.render();
            app.scrollToActiveSong()
        }

        // Lắng nghe click vào playlist
        playlist.onclick = (e) => {
            //Click vào bất kì phần tử con của song nào cũng được 
            //trừ thằng đang active
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                //khi click vào song
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    audio.play();
                    app.render()
                }


                //khi click vào option
            }
        }
    },
    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    prevSong: function () {

        if (this.currentIndex == 0) {
            this.currentIndex = app.songs.length - 1;
        } else {
            this.currentIndex--;
        }
        this.loadCurrentSong();
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length - 1) {
            this.currentIndex = 0
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100)
    },
    start: function () {
        //Định nghĩa thuộc tính cho object
        this.defineProperties();
        //xử lý sự kiện
        this.handleEvents()
        //Tải thông tin bài đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()
        //render ra playlist
        this.render();
    },
}
app.start();

