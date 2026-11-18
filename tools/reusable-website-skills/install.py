#!/usr/bin/env python3
"""Install bundled Codex skills without overwriting existing folders."""
import argparse, os, shutil
from pathlib import Path
parser=argparse.ArgumentParser()
parser.add_argument('--destination', type=Path, default=Path(os.environ.get('CODEX_HOME',Path.home()/'.codex'))/'skills')
parser.add_argument('--dry-run', action='store_true')
args=parser.parse_args()
folders=sorted(p for p in Path(__file__).resolve().parent.iterdir() if (p/'SKILL.md').is_file())
conflicts=[args.destination/p.name for p in folders if (args.destination/p.name).exists()]
if conflicts:
 parser.error('Refusing to overwrite: '+', '.join(map(str,conflicts)))
for folder in folders:
 print(str(folder.name)+' -> '+str(args.destination/folder.name))
 if not args.dry_run:
  args.destination.mkdir(parents=True,exist_ok=True)
  shutil.copytree(folder,args.destination/folder.name)
