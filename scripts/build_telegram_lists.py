import requests
from pathlib import Path

URL = "https://core.telegram.org/resources/cidr.txt"

resp = requests.get(URL, timeout=30)
resp.raise_for_status()
source = [line.strip() for line in resp.text.splitlines() if line.strip()]

# --- Clash/IPs/Telegram.yaml ---
yaml_path = Path("Clash/IPs/Telegram.yaml")
yaml_path.parent.mkdir(parents=True, exist_ok=True)

with yaml_path.open("w", encoding="utf-8") as f:
    f.write("payload:\n")
    for cidr in source:
        f.write(f"  - {cidr}\n")

# --- Shadowrocket/Telegram.list ---
ipv4_final_order = [
    "109.239.140.0/24",
    "149.154.160.0/20",
    "5.28.192.0/18",
    "91.108.0.0/16",
]

# Проверяем наличие f23c/f23d
have_f23c = any(s.lower().startswith("2001:b28:f23c::/48") for s in source)
have_f23d = any(s.lower().startswith("2001:b28:f23d::/48") for s in source)

ipv6_agg = []
if have_f23c and have_f23d:
    ipv6_agg.append("2001:b28:f23c::/47")
else:
    if have_f23c: ipv6_agg.append("2001:b28:f23c::/48")
    if have_f23d: ipv6_agg.append("2001:b28:f23d::/48")

ipv6_ordered = []
ipv6_ordered.append("2001:67c:4e8::/48")
ipv6_ordered.extend(ipv6_agg)
ipv6_ordered.extend(["2001:b28:f23f::/48", "2a0a:f280::/29"])

list_path = Path("Shadowrocket/Telegram.list")
list_path.parent.mkdir(parents=True, exist_ok=True)

with list_path.open("w", encoding="utf-8") as f:
    for cidr in ipv4_final_order:
        f.write(f"IP-CIDR,{cidr},no-resolve\n")
    for cidr in ipv6_ordered:
        f.write(f"IP-CIDR6,{cidr},no-resolve\n")

print("Generated:")
print(" -", yaml_path)
print(" -", list_path)
