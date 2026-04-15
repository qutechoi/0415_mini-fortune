import { useMemo, useState } from 'react'
import './App.css'

const fortuneThemes = [
  {
    key: 'sunrise',
    label: '여명의 카드',
    intro: '희미한 빛이 천천히 번지듯, 오늘은 서두르지 않는 시작이 운을 깨운다.',
    vibe: '맑고 정돈된 기류',
    palette: 'sunrise',
    sigil: '✦',
  },
  {
    key: 'spark',
    label: '도약의 카드',
    intro: '작은 결심 하나가 운명의 톱니를 다시 맞물리게 할 수 있어.',
    vibe: '빠르고 선명한 파동',
    palette: 'spark',
    sigil: '✧',
  },
  {
    key: 'moon',
    label: '월광의 카드',
    intro: '설명되지 않는 직감이 오늘은 가장 정확한 나침반이 될지도 몰라.',
    vibe: '몽환적이고 부드러운 결',
    palette: 'moon',
    sigil: '☾',
  },
  {
    key: 'forest',
    label: '회복의 카드',
    intro: '속도를 늦춘 자만이 오늘 숨겨진 문을 조용히 발견하게 된다.',
    vibe: '차분하고 깊은 숨결',
    palette: 'forest',
    sigil: '❈',
  },
]

const fortunePool = {
  overall: [
    '멈춰 있던 기류가 서서히 다시 흐르기 시작한다. 오늘은 억지보다 자연스러운 흐름을 믿는 편이 맞아.',
    '한 번의 정확한 선택이 여러 갈래의 망설임을 잠재울 수 있는 날이다.',
    '작은 타이밍 하나가 하루 전체의 결을 아름답게 바꿔놓을 가능성이 크다.',
    '흩어졌던 마음은 늦은 오후가 되면 제자리를 되찾을 조짐이 보인다.',
    '조용히 쌓인 것들이 마침내 존재감을 드러내기 시작하는 하루다.',
  ],
  love: [
    '마음을 길게 설명하기보다, 진심이 묻어나는 한 문장이 더 멀리 닿을 수 있어.',
    '상대의 마음을 짐작만 하지 말고, 부드럽게 확인하는 용기가 관계를 가볍게 만든다.',
    '억지로 밀고 당기기보다, 편안한 온도로 다가갈수록 감정의 문이 열린다.',
    '예상보다 대화의 흐름이 다정하게 이어질 가능성이 있다.',
    '혼자 접어두던 감정이 의외의 반응 덕분에 한결 가벼워질 수 있어.',
  ],
  money: [
    '오늘의 지출은 필요보다 감정의 보상인지 먼저 살피는 게 좋아.',
    '큰돈보다 자잘하게 새는 흐름을 붙잡는 편이 훨씬 현명하다.',
    '지금 바로 결제하지 말고 하루만 묵히면 판단의 안개가 걷힐 가능성이 크다.',
    '정보를 위한 소비는 남지만, 충동을 위한 소비는 금방 빛이 바랠 수 있어.',
    '오늘은 지갑보다 메모장을 여는 쪽이 미래의 운을 아껴준다.',
  ],
  work: [
    '할 일을 줄이는 순간 오히려 집중이 되살아날 수 있다.',
    '많이 하는 것보다 하나를 또렷하게 끝내는 편이 오늘의 승부수야.',
    '오전에 방향만 정확히 잡아두면 오후는 생각보다 부드럽게 흘러갈 거야.',
    '혼자 오래 붙든 문제는 짧은 공유 한 번으로 의외로 쉽게 풀릴 수 있다.',
    '완벽함보다 마감의 리듬을 택하는 편이 오늘은 더 현명하다.',
  ],
  luck: [
    '우연한 대화, 짧은 산책, 예상 밖의 추천 속에 행운의 실마리가 숨어 있다.',
    '오늘의 행운은 빠른 결정이 아니라 잘 고른 타이밍에서 들어온다.',
    '익숙한 루틴 속 작은 이탈이 뜻밖의 기회를 불러올 수 있어.',
    '무심코 지나칠 뻔한 메시지 하나가 좋은 방향을 열어줄 수 있다.',
    '정리와 삭제가 곧 새 운을 들이는 의식처럼 작동할 가능성이 있다.',
  ],
}

const luckyColors = ['라벤더 미스트', '오로라 블루', '앰버 골드', '모스 그린', '로즈 핑크']
const luckyItems = ['은은한 향의 차', '이어폰', '작은 노트', '실버 액세서리', '텀블러', '가벼운 셔츠']
const luckyTimes = ['09:20', '11:11', '14:40', '17:25', '21:07']

function pickFrom(list, index) {
  return list[index % list.length]
}

function buildFortune(name, themeIndex, drawCount) {
  const seed = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) + themeIndex * 17 + drawCount * 31
  const theme = fortuneThemes[themeIndex]

  return {
    theme,
    overall: pickFrom(fortunePool.overall, seed),
    love: pickFrom(fortunePool.love, seed + 3),
    money: pickFrom(fortunePool.money, seed + 5),
    work: pickFrom(fortunePool.work, seed + 7),
    luck: pickFrom(fortunePool.luck, seed + 11),
    luckyColor: pickFrom(luckyColors, seed + 13),
    luckyItem: pickFrom(luckyItems, seed + 17),
    luckyTime: pickFrom(luckyTimes, seed + 19),
  }
}

function App() {
  const [name, setName] = useState('Qute')
  const [themeIndex, setThemeIndex] = useState(0)
  const [drawCount, setDrawCount] = useState(1)
  const [isDrawing, setIsDrawing] = useState(false)

  const fortune = useMemo(() => buildFortune(name || '이름 없는 여행자', themeIndex, drawCount), [name, themeIndex, drawCount])

  const handleDraw = () => {
    setIsDrawing(true)
    window.setTimeout(() => {
      setDrawCount((count) => count + 1)
      setIsDrawing(false)
    }, 520)
  }

  return (
    <main className={`page-shell ${fortune.theme.palette}`}>
      <div className="orb orb-left" aria-hidden="true" />
      <div className="orb orb-right" aria-hidden="true" />

      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">0415 Tarot Fortune</span>
          <h1>오늘의 카드를 한 장 뒤집어봐</h1>
          <p>
            이름과 오늘의 기류를 고르면, 사랑, 금전, 일, 행운의 징조를 타로 카드 같은 감성으로
            펼쳐 보여주는 작은 운세 앱이야.
          </p>
        </div>

        <div className="control-card">
          <label className="field">
            <span>이름 또는 호칭</span>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="운세를 받을 이름을 적어줘" />
          </label>

          <div className="theme-picker">
            <span>오늘 끌리는 카드</span>
            <div className="theme-grid">
              {fortuneThemes.map((theme, index) => (
                <button
                  key={theme.key}
                  type="button"
                  className={index === themeIndex ? 'theme-button active' : 'theme-button'}
                  onClick={() => setThemeIndex(index)}
                >
                  <strong>
                    {theme.sigil} {theme.label}
                  </strong>
                  <small>{theme.vibe}</small>
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="draw-button" onClick={handleDraw}>
            카드를 다시 펼치기
          </button>
        </div>
      </section>

      <section className={`fortune-stage ${isDrawing ? 'is-drawing' : ''}`}>
        <article className="fortune-main-card tarot-card">
          <div className="card-stars" aria-hidden="true">
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
          </div>

          <div className="fortune-main-head">
            <span className="fortune-badge">
              {fortune.theme.sigil} {fortune.theme.label}
            </span>
            <p>{fortune.theme.intro}</p>
          </div>

          <div>
            <h2>{name || '이름 없는 여행자'}에게 도착한 오늘의 징조</h2>
            <p className="fortune-overall">{fortune.overall}</p>
          </div>

          <div className="lucky-strip">
            <div>
              <span>Lucky color</span>
              <strong>{fortune.luckyColor}</strong>
            </div>
            <div>
              <span>Lucky item</span>
              <strong>{fortune.luckyItem}</strong>
            </div>
            <div>
              <span>Lucky time</span>
              <strong>{fortune.luckyTime}</strong>
            </div>
          </div>
        </article>

        <div className="fortune-grid">
          <article className="fortune-detail tarot-card love">
            <span>Love</span>
            <h3>사랑의 흐름</h3>
            <p>{fortune.love}</p>
          </article>
          <article className="fortune-detail tarot-card money">
            <span>Money</span>
            <h3>금전의 흐름</h3>
            <p>{fortune.money}</p>
          </article>
          <article className="fortune-detail tarot-card work">
            <span>Work</span>
            <h3>일과 몰입의 흐름</h3>
            <p>{fortune.work}</p>
          </article>
          <article className="fortune-detail tarot-card luck">
            <span>Luck</span>
            <h3>행운의 징조</h3>
            <p>{fortune.luck}</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
