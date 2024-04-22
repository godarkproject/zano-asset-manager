package asset

import (
	"bufio"
	"context"
	"fmt"
	"os/exec"
)

func Deploy(ctx context.Context, walletFile string, password string) error {
	cmd := exec.Command("binaries/simplewallet", "--wallet-file", fmt.Sprintf("wallets/%s", walletFile), "--password", password, "--daemon-address", "127.0.0.1:11211", "deploy_new_asset", "tmp/asset.txt", "--no-password-confirmation")

	// Set the working directory if needed
	// cmd.Dir = "/path/to/zanod/directory"

	// Redirect standard output and standard error to the console
	//cmd.Stdout = os.Stdout
	//cmd.Stderr = os.Stderr

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Println(err)
	}

	// Start the command
	if err := cmd.Start(); err != nil {
		return err
	}

	Pipe(ctx, "deploy", stdout)
	scanner := bufio.NewScanner(stdout)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}

	// Wait for the command to finish (which will never happen for a persistent process)
	// This is triggered on invalid wallet password
	if err := cmd.Wait(); err != nil {
		return err
	}

	return nil
}
