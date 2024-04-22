package shutdown

import (
	"github.com/shirou/gopsutil/v3/process"
	"log"
	"syscall"
)

func Processes(processNames []string) error {
	for _, name := range processNames {
		processes, err := process.Processes()
		if err != nil {
			return err
		}
		for _, p := range processes {
			n, err := p.Name()
			if err != nil {
				return err
			}
			if n == name {
				log.Printf("killing %s", n)
				_ = p.SendSignal(syscall.SIGINT)
			}
		}
	}
	return nil
}
