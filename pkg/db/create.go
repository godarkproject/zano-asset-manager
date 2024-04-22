package db

import (
	"fmt"
	"github.com/godarkproject/zano-asset-manager/pkg/initialize"

	"github.com/google/uuid"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Create(originAddress string, ticker string, fullName string, assetId string, maxSupply string, currentSupply string, decimal string, metaInfo string, wallet string, image string) bool {
	db, err := gorm.Open(sqlite.Open("storage/zano_asset_manager.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// fmt.Println(bazaarHash)

	newUuid := fmt.Sprintf("%s", uuid.New())
	bazaar := initialize.Assets{
		OriginAddress: originAddress,
		Ticker:        ticker,
		FullName:      fullName,
		AssetId:       assetId,
		MaxSupply:     maxSupply,
		CurrentSupply: currentSupply,
		Decimal:       decimal,
		MetaInfo:      metaInfo,
		Image:         image,
		WalletFile:    wallet,
		Uuid:          newUuid,
	}

	result := db.Create(&bazaar)
	err = result.Error
	if err != nil || result.RowsAffected == 0 {
		return false
	}

	return true
}
