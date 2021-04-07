# https://dev.to/sauravjaiswalsj/automating-git-push-with-just-a-single-bash-command-460n

echo "moving to main branch"
git checkout main
echo "merging main branch with new-face branch"
git merge new-face
echo "pushing new merged changes in main branch"
git push
echo "going back to new-face branch"
git checkout new-face