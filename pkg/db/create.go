package db

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/kekzploit/zano-bazaar/pkg/startup"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func CreateBazaar(title string, img string, contact string, description string, expiry int, url string, publicKey string, marketName string, market string, address string, alias string, bazaarHash string) bool {
	db, err := gorm.Open(sqlite.Open("database/bazaar.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// fmt.Println(bazaarHash)

	newUuid := fmt.Sprintf("%s", uuid.New())
	bazaar := startup.Bazaars{
		Market:         market,
		MarketName:     marketName,
		PaymentAddress: address,
		Alias:          alias,
		Title:          title,
		Image:          img,
		Description:    description,
		Url:            url,
		Contact:        contact,
		Status:         "new",
		Expires:        expiry,
		PublicKey:      publicKey,
		Favourite:      false,
		UUID:           newUuid,
		Hash:           bazaarHash,
	}

	result := db.Create(&bazaar)
	err = result.Error
	if err != nil || result.RowsAffected == 0 {
		return false
	}

	return true
}

func CreateMarket(name string, description string, key string) bool {
	db, err := gorm.Open(sqlite.Open("database/bazaar.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	newUuid := fmt.Sprintf("%s", uuid.New())
	market := startup.Markets{
		Name:        name,
		Description: description,
		UUID:        newUuid,
		Key:         key,
	}

	result := db.Create(&market)
	err = result.Error
	if err != nil || result.RowsAffected == 0 {
		return false
	}

	return true
}

func CreateBlacklist(bazaar string, uuid string) bool {
	db, err := gorm.Open(sqlite.Open("database/bazaar.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	blacklist := startup.Blacklist{
		Bazaar: bazaar,
		UUID:   uuid,
	}

	result := db.Create(&blacklist)
	err = result.Error
	if err != nil || result.RowsAffected == 0 {
		return false
	}

	return true
}

func CreateFavourite(bazaar string, uuid string) bool {
	db, err := gorm.Open(sqlite.Open("database/bazaar.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	favourite := startup.Favourites{
		Bazaar: bazaar,
		UUID:   uuid,
	}

	result := db.Create(&favourite)
	err = result.Error
	if err != nil || result.RowsAffected == 0 {
		return false
	}

	return true
}
