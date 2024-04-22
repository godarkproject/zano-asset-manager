package initialize

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Assets struct {
	OriginAddress string `json:"owner"`
	Ticker        string `json:"ticker"`
	FullName      string `json:"full_name"`
	AssetId       string `json:"asset_id"`
	MaxSupply     string `json:"max_supply"`
	CurrentSupply string `json:"current_supply"`
	Decimal       string `json:"decimal"`
	MetaInfo      string `json:"meta_info"`
	Image         string `json:"image"`
	WalletFile    string `json:"wallet_file"`
	Uuid          string `json:"uuid"`
}

type Airdrops struct {
	Address string `json:"address"`
	Asset   string `json:"asset"`
	AssetId string `json:"asset_id"`
}

func Db() {
	db, err := gorm.Open(sqlite.Open("storage/zano_asset_manager.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	_ = db.AutoMigrate(&Assets{})
}
