package db

import (
	"github.com/godarkproject/zano-asset-manager/pkg/initialize"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func AssetQuery(assetName string) initialize.Assets {
	db, err := gorm.Open(sqlite.Open("storage/zano_asset_manager.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	var asset []initialize.Assets

	// SELECT * FROM users WHERE id = 1
	db.Where("full_name = ?", assetName).First(&asset)
	for _, asset := range asset {
		return asset
	}

	return initialize.Assets{}
}
