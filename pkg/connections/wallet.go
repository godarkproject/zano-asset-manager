package zano

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
)

type GetAddressReq struct {
	Jsonrpc string `json:"jsonrpc"`
	Id      int    `json:"id"`
	Method  string `json:"method"`
}

type GetAddressRes struct {
	Id      int    `json:"id"`
	Jsonrpc string `json:"jsonrpc"`
	Result  struct {
		Address string `json:"address"`
	} `json:"result"`
}

func Simplewallet(jsonBody string) bool {
	url := "http://127.0.0.1:11212/json_rpc"
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
			return
		}
	}(res.Body)

	body, _ := io.ReadAll(res.Body)
	data := GetAddressRes{}
	_ = json.Unmarshal(body, &data)

	if data.Result.Address != "" {
		return true
	}
	return false
}
