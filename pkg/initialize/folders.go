package initialize

import (
	"os"
)

func Folders() {
	// folders to search for existence
	var folders = []string{"binaries", "images", "misc", "storage", "tmp", "wallets"}

	// create static directory
	for _, folder := range folders {
		if _, err := os.Stat(folder); os.IsNotExist(err) {
			err := os.Mkdir(folder, 0755)
			if err != nil {
				return
			}
		}
	}
}
