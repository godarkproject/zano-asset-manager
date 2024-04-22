package zano

import (
	"bufio"
	"fmt"
	"os/exec"
	"strings"
)

func Zanod() {
	// Command to run ./zanod with the specified arguments
	cmd := exec.Command("binaries/zanod", "--rpc-bind-ip", "127.0.0.1", "--rpc-bind-port", "11211", "--log-level", "3", "--hide-my-port", "--disable-upnp", "--no-console", "--disable-debug-p2p-requests")

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Println(err)
	}

	// Start the command and check for errors
	if err := cmd.Start(); err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(stdout)
	for scanner.Scan() {
		if strings.Contains(scanner.Text(), "sync progress") || strings.Contains(scanner.Text(), "Synchronized set to TRUE") {
			fmt.Println(scanner.Text())
		}
	}

	// Wait for the command to finish
	if err := cmd.Wait(); err != nil {
		fmt.Println(err)
	}
}
