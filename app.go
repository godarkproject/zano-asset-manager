package main

import (
	"context"
	"fmt"
	"github.com/godarkproject/zano-asset-manager/pkg/asset"
	"github.com/godarkproject/zano-asset-manager/pkg/connections"
	"github.com/godarkproject/zano-asset-manager/pkg/db"
	"github.com/godarkproject/zano-asset-manager/pkg/initialize"
	"github.com/godarkproject/zano-asset-manager/pkg/shutdown"
	"github.com/godarkproject/zano-asset-manager/pkg/startup/zano"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"strconv"
	"strings"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved,
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	initialize.Folders()
	initialize.Db()
	zano.Zanod()
	a.ctx = ctx
}

// beforeClose is called when the app is quit.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	// pre-shutdown functions
	defer func() {
		if prevent {
			return
		}
		processNames := []string{"simplewallet", "zanod"}
		_ = shutdown.Processes(processNames)
	}()

	dialog, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:    runtime.QuestionDialog,
		Title:   "Quit?",
		Message: "Are you sure you want to quit?",
	})

	if err != nil {
		return false
	}

	return dialog != "Yes"
}

// LaunchWallet launches wallet in RPC mode
func (a *App) LaunchWallet(walletFile string, password string) bool {
	if err := zano.Simplewallet(walletFile[12:], password); err != nil {
		return false
	}
	return true
}

// DaemonStatus returns a bool if daemon running
func (a *App) DaemonStatus() bool {
	zanodConn := connections.ZanodConnection()
	return zanodConn
}

// WalletStatus returns a bool if wallet running
func (a *App) WalletStatus() bool {
	walletConn := connections.WalletConnection()
	return walletConn
}

// DisconnectWallet kills wallet process
func (a *App) DisconnectWallet() bool {
	processNames := []string{"simplewallet"}
	_ = shutdown.Processes(processNames)
	return true
}

// DeployAsset returns a greeting for the given name
func (a *App) DeployAsset(originAddress string, ticker string, fullName string, maxSupply string, currentSupply string, decimal string, metaInfo string, wallet string, image string, password string) bool {

	ui64Max, err := strconv.ParseUint(maxSupply, 10, 64)
	if err != nil {
		fmt.Println(err)
	}

	ui64Cur, err := strconv.ParseUint(currentSupply, 10, 64)
	if err != nil {
		fmt.Println(err)
	}

	intDecimal, _ := strconv.Atoi(decimal)

	asset.JsonFile(ticker, fullName, ui64Max, ui64Cur, intDecimal, metaInfo)

	fmt.Println(image)
	err, stdoutSlice := asset.Deploy(wallet[12:], password)
	if err != nil {
		return false
	}

	for _, msg := range stdoutSlice {
		if strings.Contains(msg, "") {
			fmt.Println(msg)
		}
	}

	assetData := db.AssetQuery(fullName)

	assetCreated := db.Create(originAddress, ticker, fullName, assetData.AssetId, ui64Max, ui64Cur, intDecimal, metaInfo, wallet, image)
	if !assetCreated {
		return false
	}

	return true
}

// EmitAsset returns a greeting for the given name
func (a *App) EmitAsset(assetName string, emitAmount string, walletFile string, walletPassword string) bool {
	// get asset ID from the asset name from DB
	ui64Emit, err := strconv.ParseUint(emitAmount, 10, 64)
	if err != nil {
		fmt.Println(err)
	}

	assetData := db.AssetQuery(assetName)

	emitStdout, err := asset.Emit(assetData.AssetId, ui64Emit, walletFile, walletPassword)
	if err != nil {
		return false
	}

	fmt.Println(emitStdout)

	return true
}

// BurnAsset returns a greeting for the given name
func (a *App) BurnAsset(assetName string, burnAmount string, walletFile string, walletPassword string) bool {
	// get asset ID from the asset name from DB
	ui64Burn, err := strconv.ParseUint(burnAmount, 10, 64)
	if err != nil {
		fmt.Println(err)
	}

	assetData := db.AssetQuery(assetName)

	emitStdout, err := asset.Burn(assetData.AssetId, ui64Burn, walletFile, walletPassword)
	if err != nil {
		return false
	}

	fmt.Println(emitStdout)

	return true
}

// EditAsset returns a greeting for the given name
func (a *App) EditAsset(assetName string, metaInfo, walletFile string, walletPassword string) bool {
	// get asset ID from the asset name from DB
	fmt.Println(assetName, metaInfo, walletFile, walletPassword)

	assetData := db.AssetQuery(assetName)

	fmt.Println(assetData)

	return true
}
