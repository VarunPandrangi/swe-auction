async function main() {
  process.stdout.write('Seed placeholder: Exiting 0\n');
  process.exit(0);
}

void main().catch((e) => {
  process.stderr.write(`${String(e)}\n`);
  process.exit(1);
});
