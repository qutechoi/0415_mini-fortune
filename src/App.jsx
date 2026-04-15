import { useMemo, useState } from 'react'
import './App.css'

const fortuneThemes = [
  {
    key: 'sunrise',
    label: '새벽형',
    intro: '조용한 시작이 오늘의 기세를 정해줄 거야.',
    vibe: '맑고 정돈된 결',
    palette: 'sunrise',
  },
  {
    key: 'spark',
    label: '도약형',
    intro: '작은 결심 하나가 흐름을 크게 바꿀 수 있어.',
    vibe: '빠르고 선명한 결',
    palette: 'spark',
  },
  {
    key: 'moon',
    label: '직감형',
    intro: '오늘은 논리보다 감각이 먼저 맞을 수도 있어.',
    vibe: '부드럽고 몽환적인 결',
    palette: 'moon',
  },
  {
    key: 'forest',
    label: '회복형',
    intro: '속도를 줄일수록 오히려 더 멀리 갈 수 있어.',
    vibe: '차분하고 깊은 결',
    palette: 'forest',
  },
]

const fortunePool = {
  overall: [
    '멈춰 있던 일이 생각보다 부드럽게 다시 풀릴 수 있어.',
    '오늘은 크게 밀기보다 정확하게 고르는 쪽이 이득이야.',
    '작은 타이밍 하나가 하루의 인상을 꽤 좋게 바꿔줄 수 있어.',
    '괜히 흔들리던 마음이 오후쯤엔 자리를 찾을 가능성이 커.',
    '조용히 쌓은 게 뒤늦게 티 나는 날이야.',
  ],
  love: [
    '감정 표현은 과한 설명보다 한 문장이 더 잘 먹힐 수 있어.',
    '상대 마음을 추측하기보다 가볍게 확인해보는 게 좋아.',
    '괜히 밀당하지 말고, 편한 온도로 다가가는 쪽이 맞아.',
    '기대보다 대화의 결이 부드럽게 이어질 가능성이 있어.',
    '혼자 정리하던 감정이 예상 밖의 반응으로 가벼워질 수 있어.',
  ],
  money: [
    '오늘 소비는 기분 보상형인지 먼저 체크해보는 게 좋아.',
    '큰 지출보다 자잘한 새는 돈을 잡는 쪽이 더 효과적이야.',
    '당장 결제하기보다 하루만 묵히면 판단이 또렷해질 수 있어.',
    '정보성 소비는 괜찮지만, 충동성 소비는 만족도가 짧을 수 있어.',
    '지갑은 닫고 메모장은 여는 쪽이 오늘은 승률이 높아.',
  ],
  work: [
    '할 일을 줄이는 순간 오히려 집중이 살아날 수 있어.',
    '대충 많이 하기보다 하나를 깔끔하게 끝내는 게 오늘의 포인트야.',
    '오전에 방향만 잘 잡으면 오후는 생각보다 편해질 거야.',
    '혼자 끙끙대던 일은 짧게 공유하면 더 빨리 풀릴 수 있어.',
    '완벽주의보다 마감 감각을 우선하면 흐름이 좋아져.',
  ],
  luck: [
    '행운 포인트는 우연한 대화, 짧은 산책, 예상 밖의 추천이야.',
    '오늘의 행운은 빠른 결정이 아니라 잘 고른 타이밍에서 와.',
    '익숙한 루틴 안에서 의외의 기회가 숨어 있을 수 있어.',
    '무심코 넘긴 메시지 하나가 좋은 실마리가 될 수 있어.',
    '정리와 삭제가 곧 운을 여는 행동이 될 가능성이 있어.',
  ],
}

const luckyColors = ['라벤더 미스트', '오로라 블루', '앰버 골드', '모스 그린', '로즈 핑크']
const luckyItems = ['차가운 물 한 잔', '이어폰', '메모 앱', '가벼운 셔츠', '텀블러', '작은 노트']
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

  const fortune = useMemo(() => buildFortune(name || '오늘의 주인공', themeIndex, drawCount), [name, themeIndex, drawCount])

  const handleDraw = () => {
    setDrawCount((count) => count + 1)
  }

  return (
    <main className={`page-shell ${fortune.theme.palette}`}>
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">0415 Mini Fortune</span>
          <h1>오늘의 운세를 한 장 뽑아봐</h1>
          <p>
            이름과 오늘의 분위기를 고르면, 사랑, 돈, 일, 행운 포인트를 감성 카드처럼 보여주는
            미니 운세 생성기야.
          </p>
        </div>

        <div className="control-card">
          <label className="field">
            <span>이름</span>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="이름을 적어줘" />
          </label>

          <div className="theme-picker">
            <span>오늘의 분위기</span>
            <div className="theme-grid">
              {fortuneThemes.map((theme, index) => (
                <button
                  key={theme.key}
                  type="button"
                  className={index === themeIndex ? 'theme-button active' : 'theme-button'}
                  onClick={() => setThemeIndex(index)}
                >
                  <strong>{theme.label}</strong>
                  <small>{theme.vibe}</small>
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="draw-button" onClick={handleDraw}>
            운세 다시 뽑기
          </button>
        </div>
      </section>

      <section className="fortune-stage">
        <article className="fortune-main-card">
          <div className="fortune-main-head">
            <span className="fortune-badge">{fortune.theme.label}</span>
            <p>{fortune.theme.intro}</p>
          </div>

          <div>
            <h2>{name || '오늘의 주인공'}님의 오늘</h2>
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
          <article className="fortune-detail love">
            <span>Love</span>
            <h3>사랑운</h3>
            <p>{fortune.love}</p>
          </article>
          <article className="fortune-detail money">
            <span>Money</span>
            <h3>금전운</h3>
            <p>{fortune.money}</p>
          </article>
          <article className="fortune-detail work">
            <span>Work</span>
            <h3>일과 집중</h3>
            <p>{fortune.work}</p>
          </article>
          <article className="fortune-detail luck">
            <span>Luck</span>
            <h3>행운 포인트</h3>
            <p>{fortune.luck}</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
