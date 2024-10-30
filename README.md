# javascript-lotto-precourse

## Folder Structure
---
```
📦 javascript-lotto-7
README.md
├─ __tests_
│  ├─ ApplicationTest.js
│  └─ LottoTest.js
└─ src
   ├─ index.js
   ├─ App.js
   ├─ domain
   │  ├─ Lotto.js
   │  ├─ Consumer.js
   │  └─ Seller.js
   ├─ Service
   │  └─ host.js
   ├─ Utils
   │  └─ manager.js
   └─ package.json
```
## Class Diagram
---
```mermaid
---
title: Lotto Project Class Diagram
---
classDiagram
    index <|-- App
    App <|-- Host
    Manager --> Host
    Host *-- Consumer
    Host *-- Seller
    Host *-- Lotto
    class App {
        +run() void
    }
    class Lotto {
        -numbers
        -validate()
        +numberSort()
        +splitNumber()
        +getNumbers()
    }

    class Consumer {
        -money
        -myLottos
        +buyLotto() 
        +buyLottoNumbers()
        +getMyLottos() 
    }

    class Host {
        -successFlag
        -winningLotto
        -totalPrize
        -bonusNumber
        +printLottoCount() 
        +printLottoNumbers() 
        +pickNumber() 
        +pickBonusNumber() 
        +printWinningDetails() 
        +calcProfit()
        +getBonusNumber()
        -validateInput() 
    }

    class Manager {
        -errorMsg
        -endFlag
        +showError()
        +endGame()
        +isGameEnd()
    }

    class Seller {
        -price
        +getLottoCount()
        +getLottoNumberCount()
        +getPrice()
    }
```
## 구현 기능 목록
---
1. 구입 금액을 입력 받는다.
```
구입 금액 1,000 단위, 1,000 단위로 나누어 떨어지지 않을 경우 예외 처리
```
2. 구입한 금액만큼 로또 수량 및 번호를 출력, 단, 로또 번호는 오름차순 정렬되어야 한다.
    - 로또 번호 하나당 숫자의 범위는 1 ~ 45까지 이다.
    - 1개의 로또를 발행할 때 중복되지 않는 6개의 숫자를 뽑는다.
```
MissonUtils.Random.pickUniqueNumbersInRange(1, 45);
```
3. 당첨 번호를 입력한다.
4. 보너스 번호를 입력한다.
```
잘못된 숫자를 입력 받는 경우 -> input Error
 - 잘못된 숫자 : 음수, 45를 초과하는 자연수, 실수
```
5. 당첨 내역을 출력한다.
```
당첨은 1등부터 5등까지의 당첨 기준과 금액
1등: 6개 번호 일치 / 2,000,000,000원
2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
3등: 5개 번호 일치 / 1,500,000원
4등: 4개 번호 일치 / 50,000원
5등: 3개 번호 일치 / 5,000원
```
6. 수익률을 계산하여 출력한다.
```
수익률 = 당첨 금액 / 구매 금액 (단, 소수점 둘째 자리에서 반올림)
```
7. 사용자가 잘못된 값을 입력할 경우 "[ERROR]"로 시작하는 메시지와 함께 Error를 발생
    - 해당 메시지를 출력한 다음 해당 지점부터 다시 입력을 받는다. (종료가 아님)
8. 로또 게임을 종료한다.