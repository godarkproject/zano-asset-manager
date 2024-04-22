package zano

import (
	"fmt"
	"os/exec"
)

func Simplewallet(wallet string, password string) error {
	// Command to run ./zanod with the specified arguments
	cmd := exec.Command("binaries/simplewallet", "--wallet-file", fmt.Sprintf("wallets/%s", wallet), "--password", password, "--rpc-bind-ip", "127.0.0.1", "--rpc-bind-port", "11212", "--daemon-address", "127.0.0.1:11211")
	// Get a pipe to read from standard out
	//r, _ := cmd.StdoutPipe()

	// Use the same pipe for standard error
	//cmd.Stderr = cmd.Stdout

	// Create a scanner which scans r in a line-by-line fashion
	//scanner := bufio.NewScanner(r)

	// Use the scanner to scan the output line by line and log it,
	// It's running in a goroutine so that it doesn't block
	//go func() {
	//	for scanner.Scan() {
	//		fmt.Println(scanner.Text())
	//	}
	//}()

	// Start the command and check for errors
	if err := cmd.Start(); err != nil {
		return err
	}

	// Wait for the command to finish
	if err := cmd.Wait(); err != nil {
		return err
	}

	return nil

}
