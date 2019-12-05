## model
  定義資料型別

## controller
  為 `業務邏輯` 區塊，主要處理資料庫增刪改查

## middleware
  中間處理，主要處理初始化資料庫其設定，實體化資料表結構，定義 API 方法接受 request，回傳 response

## router
  路由端，主要處理 API 路徑對應其方法，`GET、POST、DELETE、PUT`

## websocket
  同步連線處理區塊，房間邏輯，訊息派送，連線管理

## main.go
  主程式入口點

## go mod
  模組管理，類似 `package.json`

## go sum
  鎖定模組版本，類似 `package.lock.json`

### Powered by GP project