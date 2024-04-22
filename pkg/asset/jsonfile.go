package asset

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
)

type JsonStruct struct {
	Ticker        string `json:"ticker"`
	FullName      string `json:"full_name"`
	MaxSupply     uint64 `json:"total_max_supply"`
	CurrentSupply uint64 `json:"current_supply"`
	Decimal       int    `json:"decimal_point"`
	MetaInfo      string `json:"meta_info"`
}

func JsonFile(ticker string, fullName string, maxSupply string, currentSupply string, decimal string, metaInfo string) {

	intDecimal, _ := strconv.Atoi(decimal)

	ui64Max, err := strconv.ParseUint(maxSupply, 10, 64)
	if err != nil {
		fmt.Println(err)
	}

	ui64Cur, err := strconv.ParseUint(currentSupply, 10, 64)
	if err != nil {
		fmt.Println(err)
	}
	str := JsonStruct{
		Ticker:        ticker,
		FullName:      fullName,
		MaxSupply:     ui64Max,
		CurrentSupply: ui64Cur,
		Decimal:       intDecimal,
		MetaInfo:      metaInfo,
	}

	// use json.Marshal to convert the post to a []byte of JSON data
	b, err := json.Marshal(str)
	if err != nil {
		fmt.Println("Unable to convert the struct to a JSON string")
	} else {
		// convert []byte to a string type and then print
		fmt.Println(string(b))
	}

	if err := os.WriteFile("tmp/asset.txt", []byte(string(b)), 0666); err != nil {
		log.Fatal(err)
	}

}
