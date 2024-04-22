package zano

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type GetBlockCountReq struct {
	Jsonrpc string `json:"jsonrpc"`
	Id      int    `json:"id"`
	Method  string `json:"method"`
}

type GetBlockCountRes struct {
	Id      int    `json:"id"`
	Jsonrpc string `json:"jsonrpc"`
	Result  struct {
		Count  int    `json:"count"`
		Status string `json:"status"`
	} `json:"result"`
}

func ZanodConnection() bool {
	url := "http://127.0.0.1:11211/json_rpc"
	jsonBody := `
	{
		"jsonrpc": "2.0",
		"id": 0,
		"method": "get_all_alias_details"
	}`
	request, err := http.NewRequest("POST", url, bytes.NewBuffer([]byte(jsonBody)))
	if err != nil {
		return false // return meaningful statement
	}
	request.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	res, err := client.Do(request)
	if err != nil {
		return false // return meaningful statement
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("error2")
		}
	}(res.Body)

	body, _ := io.ReadAll(res.Body)
	data := GetBlockCountRes{}
	_ = json.Unmarshal(body, &data)

	// fmt.Println(data.Result.Status)

	return data.Result.Status == "OK"
}
