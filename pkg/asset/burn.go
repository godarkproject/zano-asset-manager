package asset

import (
	"bufio"
	"fmt"
	"os/exec"
)

func Burn(assetId string, burnAmount uint64, walletFile string, password string) ([]string, error) {
	var stdoutSlice []string

	cmd := exec.Command("binaries/simplewallet", "--wallet-file", fmt.Sprintf("wallets/%s", walletFile), "--password", password, "--daemon-address", "127.0.0.1:11211", "emit_asset", "tmp/asset.txt", "--no-password-confirmation")

	// Set the working directory if needed
	// cmd.Dir = "/path/to/zanod/directory"

	// Redirect standard output and standard error to the console
	//cmd.Stdout = os.Stdout
	//cmd.Stderr = os.Stderr

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return stdoutSlice, err
	}

	// Start the command
	if err := cmd.Start(); err != nil {
		return stdoutSlice, err
	}

	scanner := bufio.NewScanner(stdout)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
		//runtime.EventsEmit(ctx, "Stdout", scanner.Text())
	}

	// Wait for the command to finish (which will never happen for a persistent process)
	// This is triggered on invalid wallet password
	if err := cmd.Wait(); err != nil {
		return stdoutSlice, err
	}

	return stdoutSlice, nil
}
