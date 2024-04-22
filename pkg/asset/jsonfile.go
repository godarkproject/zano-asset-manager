package asset

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

type JsonStruct struct {
	Ticker        string `json:"ticker"`
	FullName      string `json:"full_name"`
	MaxSupply     uint64 `json:"total_max_supply"`
	CurrentSupply uint64 `json:"current_supply"`
	Decimal       int    `json:"decimal_point"`
	MetaInfo      string `json:"meta_info"`
}

func JsonFile(ticker string, fullName string, maxSupply uint64, currentSupply uint64, decimal int, metaInfo string) {

	str := JsonStruct{
		Ticker:        ticker,
		FullName:      fullName,
		MaxSupply:     maxSupply,
		CurrentSupply: currentSupply,
		Decimal:       decimal,
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
