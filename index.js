const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, console.log("サーバーが開始されました"));

app.get("/", (req,res) =>{
    res.send("プログラミングチュートリアルへようこそ");
});

// data お客様情報をサーバーにおいておく
// これをクライアントに返す
const customers = [
    {title: "田中", id: 1 },
    {title: "斎藤", id: 2 },
    {title: "高橋", id: 3 },
    {title: "安藤", id: 4 },
    {title: "スズキ", id: 5 },
];

// データを取得できるようにしよう(GETメソッド)
// どういうURLで取得するのか
// https://api.com/ 

app.get("/api/customers", (req, res) =>{
    res.send(customers);
});

// 限定して返していく　→　エンドポイント
// idを指定したリクエスト送る

app.get("/api/customers/:id", (req, res) =>{
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    res.send(customer);
});

// data を送信（作成）する。
app.post("/api/customers", (req, res) =>{
    const customer ={
        title: req.body.title,
        id: customers.length + 1,
    };
    customers.push(customer);
    res.send(customers);
});

// data 更新してみる。
app.put("/api/customers/:id" , (req, res) =>{
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    customer.title = req.body.title;
    res.send(customer);
});

app.delete("/api/customers/:id" , (req, res) =>{
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    // 配列の番号を取得
    const index =customers.indexOf(customer);
    customers.splice(index,1);
    res.send(customer);
});