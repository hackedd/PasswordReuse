# TODO: There should be an easier way to do this...
DEPS="chrome.manifest"
DEPS="$DEPS content/util.js content/classify.js"
DEPS="$DEPS content/browserOverlay.js content/browserOverlay.xul"
DEPS="$DEPS content/checkStoredPasswords.js content/checkStoredPasswords.xul"
DEPS="$DEPS locale/en-US/browserOverlay.dtd locale/en-US/browserOverlay.properties"
DEPS="$DEPS skin/browserOverlay.css"

redo-ifchange $DEPS
redo install.rdf

zip -r bin/passwordreuse.xpi install.rdf $DEPS >&2
